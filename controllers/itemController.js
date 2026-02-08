const DistributedItem = require('../models/DistributedItem');

const Agent = require('../models/Agent');

// @desc    Create a new distributed item
// @route   POST /api/items
// @access  Private/Admin
const createItem = async (req, res) => {
    const { agentId, firstName, phone, notes } = req.body;

    const item = await DistributedItem.create({
        agentId,
        firstName,
        phone,
        notes,
    });

    if (item) {
        res.status(201).json(item);
    } else {
        res.status(400).json({ message: 'Invalid item data' });
    }
};

// @desc    Get items assigned to the logged-in agent
// @route   GET /api/items/my-items
// @access  Private/Agent
const getAgentItems = async (req, res) => {
    const items = await DistributedItem.find({ agentId: req.agent._id });
    res.json(items);
};

// @desc    Get all distributed items grouped by agent
// @route   GET /api/items/grouped
// @access  Private/Admin
const getDistributedItemsByAgent = async (req, res) => {
    try {
        const distribution = await Agent.aggregate([
            {
                $lookup: {
                    from: 'distributeditems',
                    localField: '_id',
                    foreignField: 'agentId',
                    as: 'items'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    mobile: 1,
                    itemCount: { $size: '$items' },
                    items: 1
                }
            }
        ]);
        res.json(distribution);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distribution data', error: error.message });
    }
};

module.exports = { createItem, getAgentItems, getDistributedItemsByAgent };
