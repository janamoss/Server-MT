const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/Products')
const { ObjectId } = require('mongodb');
const multer = require('multer')
const upload = require('./upload')

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



router.post('/addPro', upload.single('thumbnail'), async (req, res, next) => {
    try {
        console.log('Request file:', req.file)
        let dataObj = {
            type: req.body.type,
            productName: req.body.productName,
            productDesc: req.body.productDesc,
            thumbnail: {
                data: req.file.filename,
                contentType: 'image/jpg'
            },
            idSKU:[req.body.idSKU]
        }

        const data = await Product.create(dataObj)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/onePro/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Product.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addPro', async (req, res, next) => {
    try {
        const data = await Product.create(req.body)
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
                type: type,
                productName: productName,
                productDesc: productDesc,
                thumbnail:thumbnail,
                modelPath:modelPath
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