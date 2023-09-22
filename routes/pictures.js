const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SKUs = require('../models/SKUs')
const Pic = require('../models/Pictures')
const { ObjectId } = require('mongodb');


const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await Product.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})


router.post('/addpic', async (req, res, next) => {
    try {
        const data = await Pic.create(req.body)
        const sku = await SKUs.findOne({ _id: req.body.SKUs_idSKUs});
        sku.idPictures.push(data._id);
        await sku.save();
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router