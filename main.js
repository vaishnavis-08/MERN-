const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Request Logger (Top Priority)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    console.log('Root route hit');
    res.send('API V2');
});

// MongoDB Connection
const MONGO_URI_FIXED = (process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cstech_db').replace('localhost', '127.0.0.1');
console.log('Connecting to MongoDB at:', MONGO_URI_FIXED);
mongoose.connect(MONGO_URI_FIXED, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');
const itemRoutes = require('./routes/itemRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    } else if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send(`Route not found: ${req.method} ${req.url}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Keep-alive to debug process exit
setInterval(() => {
    // console.log('Heartbeat');
}, 1000);
