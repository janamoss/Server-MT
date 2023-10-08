const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addressID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    total: Number,
    notes: String,
    status: {
        type: String,
        default: 'to pay' 
    },
    slip:String,
});

module.exports = mongoose.model('Order', orderSchema);