const mongoose = require('mongoose');

const cartitemSchema = new mongoose.Schema({
    
    Users_idUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    SKUs: [{SKUs_idSKUs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SKUs'
    },
        // isChecked : Boolean,
        created_at :{type:Date, default:Date.now},
        updated_at :{type:Date, default:Date.now},
        deleted_at : Date
}],
});

module.exports = mongoose.model('Cart_item', cartitemSchema);