const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: String,
    productName: String,
    productDesc: String,
    thumbnail: String,
    idSKU: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    }],
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now},
    deleted_at: Date
});

module.exports = mongoose.model('Products', productSchema);