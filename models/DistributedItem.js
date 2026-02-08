const mongoose = require('mongoose');

const distributedItemSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DistributedItem', distributedItemSchema);
