const mongoose = require('mongoose');

const orderdetailSchema = new mongoose.Schema({
    SKUs_idSKUs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    },
    Orders_idOrders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    size: String,
    qty: Number
});

module.exports = mongoose.model('OrderDetail', orderdetailSchema);