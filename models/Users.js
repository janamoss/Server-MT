const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idUser: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
      },
    password: String,
    fullname: String,
    phone: String,
    dateOfbirth: Date,
    gender: String,
    profile_picture: String,
    relationship: String,
    region: String,
    country: String,
    city: String,
    isAdmin: Boolean,
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now},
    deleted_at: Date
});

module.exports = mongoose.model('User', userSchema);