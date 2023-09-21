const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Cart_item', cartitemSchema);