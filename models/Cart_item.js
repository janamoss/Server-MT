const mongoose = require('mongoose');

const cartitemSchema = new mongoose.Schema({
    Users_idUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    SKUs: [
        {
            SKUs_idSKUs: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SKUs'
            },
            size: String,
            qty: Number,
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now },
            deleted_at: Date
        }
    ]
})

module.exports = mongoose.model('Cart_item', cartitemSchema);