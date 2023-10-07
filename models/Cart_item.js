const mongoose = require('mongoose');

const cartitemSchema = new mongoose.Schema({
    Users_idUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    SKUs: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SKUs'
            },
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now },
            deleted_at: Date
        }
    ]
})

module.exports = mongoose.model('Cart_item', cartitemSchema);