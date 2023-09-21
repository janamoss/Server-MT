const mongoose = require('mongoose');

const orderdetailSchema = new mongoose.Schema({
    Orders_idOrders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    SKUs: [{SKUs_idSKUs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    },
    size: String,
    qty: Number      
}]
});

module.exports = mongoose.model('OrderDetail', orderdetailSchema);