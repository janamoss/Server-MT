const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    idPictures: {
        type: Number,
        unique: true},
    path: String,
    SKUs_idSKUs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    }
    
});

module.exports = mongoose.model('Pictures', pictureSchema);