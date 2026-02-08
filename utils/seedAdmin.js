const mongoose = require('mongoose');
const Admin = require('../models/Admin');

// Explicitly use 127.0.0.1 to match debug_mongo.js success
const MONGO_URI = 'mongodb://127.0.0.1:27017/cstech_db';

console.log('Attempting to connect to MongoDB at:', MONGO_URI);

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(async () => {
        console.log('MongoDB connected successfully');
        try {
            // Check if admin exists first
            const count = await Admin.countDocuments();
            console.log(`Current admin count: ${count}`);

            await Admin.deleteMany();
            console.log('Cleared existing admins');

            const admin = new Admin({
                email: 'admin@example.com',
                password: 'password123'
            });

            await admin.save();
            console.log('Admin created successfully:');
            console.log('Email: admin@example.com');
            console.log('Password: password123');

            await mongoose.connection.close();
            console.log('Connection closed');
            process.exit(0);
        } catch (error) {
            console.error('Error creating admin:', error);
            process.exit(1);
        }
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
