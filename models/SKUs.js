const mongoose = require('mongoose');

const skusSchema = new mongoose.Schema({
    color: String,
    goldWight: String,
    price: Number,
    cost: Number,
    idPictures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pictures'
    },
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now},
    deleted_at:Date
});

module.exports = mongoose.model('SKUs', skusSchema);