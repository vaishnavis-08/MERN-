try {
    const mongoose = require('mongoose');
    console.log('Mongoose loaded successfully');
    console.log('Version:', mongoose.version);
} catch (error) {
    console.error('Error loading mongoose:', error);
}
