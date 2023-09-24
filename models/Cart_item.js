const mongoose = require('mongoose');

const cartitemSchema = new mongoose.Schema({
    Users_idUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    SKUs: [{SKUs_idSKUs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    },
    size: String,
    qty: Number      
}],
    ischeck: Boolean 
})

module.exports = mongoose.model('Cart_item', cartitemSchema);