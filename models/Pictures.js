const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    SKUs_idSKUs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    },
    path: String,
    SKUs_idSKUs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    }
    
});

module.exports = mongoose.model('Pictures', pictureSchema);