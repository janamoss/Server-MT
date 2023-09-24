const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Categories', categorieSchema);