const mongoose = require('mongoose');

const producthascatSchema = new mongoose.Schema({
    Products_idProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    Categories_idCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    }
    
});

module.exports = mongoose.model('Products_has_Categories', producthascatSchema);