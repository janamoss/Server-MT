const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SKUs = require('../models/SKUs')
const Product = require('../models/Products')
const { ObjectId } = require('mongodb');
const Cart_item = require('../models/Cart_item')

const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await SKUs.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/findSKUs', async (req, res, next) => {
    try {
        const skuIds = req.query.ids; // Get an array of SKU IDs from the query parameter

        // Use Mongoose's find method to search for SKUs with the given IDs
        const skus = await SKUs.find({ _id: { $in: skuIds } });

        res.json(skus); // Return the found SKUs as JSON
    } catch (err) {
        next(err); // Handle any errors
    }
});

router.get('/productSKUs/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await SKUs.find({
            Products_idProducts: id,
            deleted_at: { $eq: null }, // Exclude deleted SKUs
        });
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/oneSKUs/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await SKUs.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/usercart/:skuid/:id', async (req, res, next) => {
    try {
        const skuid = req.params.skuid;
        const user = req.params.id;

        const data = await Cart_item.findOne({ 
            'SKUs.SKUs_idSKUs': skuid,
            'Users_idUsers': user 
        })
        .populate({
            path: 'SKUs.SKUs_idSKUs',
            model: 'SKUs',
        })
        .populate({
            path: 'SKUs.SKUs_idSKUs.Products_idProducts',
            model: 'Products'
        });

        if (!data) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const filteredSku = data.SKUs.find((cartItem) => cartItem.SKUs_idSKUs._id.toString() === skuid);

        if (!filteredSku) {
            return res.status(404).json({ message: 'SKU not found in the cart' });
        }

        const sku = filteredSku.SKUs_idSKUs;
        const product = sku.Products_idProducts;

        const cartData = {
            _id: filteredSku._id,
            size: filteredSku.size, // Get the Size from SKU
            sku_id: sku,
            // Add other required fields here
        };

        res.json(cartData);
    } catch (error) {
        next(error);
    }
});

router.get('/oneSKUs/:itemId', async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const data = await SKUs.findById(itemId).populate('Products_idProducts');
        res.json(data);
    } catch (err) {
        next(err);
    }
});


// router.get('/oneSKUs', async (req, res, next) => {
//     try {
//         const { item } = req.query;
//         const itemArray = JSON.parse(item);

//         // Use Mongoose's find method with $in to search for SKUs with the given IDs
//         const data = await SKUs.find({ _id: { $in: itemArray } }).populate('Products_idProducts');
//         res.json(data);
//     } catch (err) {
//         next(err);
//     }
// });


router.post('/addSKUs', async (req, res, next) => {
    try {
        const { Products_idProducts, color, goldWight, price, cost, base64 } = req.body;

        let datas = {
            Products_idProducts,
            color,
            goldWight,
            price,
            cost,
            idPictures: base64
        }
        const data = await SKUs.create(datas)
        console.log(data)
        const product = await Product.findOne({ _id: Products_idProducts });
        product.idSKU.push(data._id);
        console.log(product)
        await product.save();
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/editSkus/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { Products_idProducts, color, goldWight, price, cost, base64 } = req.body;
        const currentTime = new Date();
        const data = await SKUs.findById(id).updateOne({
            $set: {
                Products_idProducts,
                color,
                goldWight,
                price,
                cost,
                idPictures: base64,
                updated_at: currentTime,
            }
        })
        // console.log("objectID:=>"+objectId(id))
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/deleteSKUs/:id', async (req, res, next) => {
    try {
        const SKUsID = req.params.id;

        // Find the product by ID and update the deleted_at field with a timestamp
        const SKUss = await SKUs.findByIdAndUpdate(
            SKUsID,
            { deleted_at: new Date() },
            { new: true }
        );

        if (!SKUss) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product has been soft deleted' });
    } catch (err) {
        next(err);
    }
});





module.exports = router