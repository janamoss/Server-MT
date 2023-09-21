const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    idOrders: String,
    total: String,
    gender: String,
    age: Number
});

module.exports = mongoose.model('Student', studentSchema);