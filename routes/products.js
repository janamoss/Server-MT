const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/Products')
const { ObjectId } = require('mongodb');
const SKUs = require('../models/SKUs');

const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await Product.find().sort({ created_at: -1 });
        console.log(data);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/onePro/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await SKUs.find({Products_idProducts:id})
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addPro', async (req, res, next) => {
    const { type, productName, productDesc, base64 } = req.body; // Destructure directly from req.body
    try {
        let datas = {
            type,
            productName,
            productDesc,
            thumbnail: base64,
        }
        const data = await Product.create(datas)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/editPro/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { type, productName, productDesc, base64 } = req.body;
        const data = await Product.findById(id).updateOne({
            $set: {
                type,
                productName,
                productDesc,
                thumbnail:base64,
            }
        })
        // console.log("objectID:=>"+objectId(id))
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/deletePro/:id', async (req,res,next)=>{
    try {
        const id = req.params.id
        const data = await Product.findById(id).deleteOne()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router