const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    Users_idUsers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Contact:{
        fullname: String,
        phonenumber: String
    },
    Address:{
        province: String,
        district: String ,
        subdistrict: String,
        streetname: String,
        postcode: String
    }
});

module.exports = mongoose.model('Address', addressSchema);