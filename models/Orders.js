const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    total: Number,
    notes: String,
    status: {
        type: String,
        default: 'to pay' 
    }

});

module.exports = mongoose.model('Order', orderSchema);