const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/cstech_db';

console.log('Connecting to:', MONGO_URI);

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('Connected!');
        try {
            const collection = mongoose.connection.collection('test_admins');
            await collection.insertOne({ test: 1 });
            console.log('Insert successful');
            await collection.drop();
            console.log('Drop successful');
            process.exit(0);
        } catch (e) {
            console.error('Operation failed:', e);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('Connection failed:', err);
        process.exit(1);
    });
