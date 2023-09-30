const mongoose = require('mongoose');

const skusSchema = new mongoose.Schema({
    Products_idProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    color: String,
    goldWight: String,
    price: Number,
    cost: Number,
    idPictures: [{
        path:String
    }],
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now},
    deleted_at:{type:Date, default:""}
});

module.exports = mongoose.model('SKUs', skusSchema);