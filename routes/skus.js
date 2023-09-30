const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SKUs = require('../models/SKUs')
const Product = require('../models/Products')
const { ObjectId } = require('mongodb');


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

router.get('/productSKUs/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await SKUs.find({ Products_idProducts: id})
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

router.post('/addSKUs', async (req, res, next) => {
    try {
        const { Products_idProducts, color, goldWight, price, cost, base64 } = req.body;

        let datas = {
            Products_idProducts, 
            color, 
            goldWight, 
            price, 
            cost, 
            idPictures:base64
        }
        const data = await SKUs.create(datas)
        console.log(data)
        const product = await Product.findOne({ _id: Products_idProducts});
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
                idPictures:base64,
                updated_at: currentTime,
            }
        })
        // console.log("objectID:=>"+objectId(id))
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router