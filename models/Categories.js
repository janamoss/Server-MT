const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    idCategories: {
        type: Number,
        unique: true},
    name: String,
  
});

module.exports = mongoose.model('Categories', categorieSchema);