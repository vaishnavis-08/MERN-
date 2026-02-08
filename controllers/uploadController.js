const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xlsx = require('xlsx');

const Agent = require('../models/Agent');
const DistributedItem = require('../models/DistributedItem');

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const results = [];
    const errors = [];

    const validateRow = (row, index) => {
        const { FirstName, Phone, Notes } = row;
        const missing = [];
        if (!FirstName) missing.push('FirstName');
        if (!Phone) missing.push('Phone');
        if (!Notes) missing.push('Notes');

        if (missing.length > 0) {
            return `Row ${index + 1}: Missing required fields: ${missing.join(', ')}`;
        }
        return null;
    };

    const processData = async (data) => {
        // data is an array of objects
        data.forEach((row, index) => {
            const error = validateRow(row, index);
            if (error) {
                errors.push(error);
            } else {
                results.push(row);
            }
        });

        if (errors.length > 0) {
            // Delete file if validation fails
            fs.unlinkSync(filePath);
            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        // Distribution Logic
        try {
            const agents = await Agent.find().limit(5);
            if (agents.length === 0) {
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'No agents found to distribute records.' });
            }

            const distributedItems = calculateDistribution(agents, results);

            await DistributedItem.insertMany(distributedItems);

            // cleanup
            fs.unlinkSync(filePath);

            res.status(200).json({
                message: 'File processed and records distributed successfully',
                totalRecords: results.length,
                agentsCount: agents.length,
                distribution: `Distributed among ${agents.length} agents.`
            });

        } catch (error) {
            console.error(error);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            res.status(500).json({ message: 'Error distributing records', error: error.message });
        }
    };

    if (ext === '.csv') {
        const rows = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => rows.push(data))
            .on('end', () => {
                processData(rows);
            })
            .on('error', (err) => {
                fs.unlinkSync(filePath);
                res.status(500).json({ message: 'Error parsing CSV file', error: err.message });
            });
    } else if (ext === '.xlsx' || ext === '.xls') {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = xlsx.utils.sheet_to_json(sheet);
            processData(rows);
        } catch (err) {
            fs.unlinkSync(filePath);
            res.status(500).json({ message: 'Error parsing Excel file', error: err.message });
        }
    } else {
        fs.unlinkSync(filePath);
        res.status(400).json({ message: 'Unsupported file type' });
    }
};

const calculateDistribution = (agents, rows) => {
    return rows.map((row, index) => {
        const agentIndex = index % agents.length;
        return {
            agentId: agents[agentIndex]._id,
            firstName: row.FirstName,
            phone: row.Phone,
            notes: row.Notes
        };
    });
};

module.exports = { uploadFile, calculateDistribution };
