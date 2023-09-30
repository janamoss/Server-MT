const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    phone: { type: String, default: "" },
    dateOfbirth: { type: Date, default: null },
    gender: { type: String, default: "" },
    profile_picture: { type: String, default: "" },
    relationship: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    Address_idAddress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: Date
});

module.exports = mongoose.model('User', userSchema);