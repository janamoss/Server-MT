const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    idProducts: Number,
    type: String,
    productName: String,
    productDesc: String,
    thumbnail: String,
    modelPath: String,
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now},
    deleted_at:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Products', productSchema);