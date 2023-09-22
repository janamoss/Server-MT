const mongoose = require('mongoose');

const skusSchema = new mongoose.Schema({
    idSKUs: {
        type: Number,
        unique: true
    },
    color: String,
    goldWight: String,
    price: Number,
    cost: Number,
    Products_idProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now},
    deleted_at:{type:Date, default:Date.now}
});

module.exports = mongoose.model('SKUs', skusSchema);