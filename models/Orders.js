const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    Users_idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    total: Number,
    notes: String,
    paymentOption: String,
    shippingOption: String,
    status: String
});

module.exports = mongoose.model('Order', orderSchema);