const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/Products')
const { ObjectId } = require('mongodb');
const SKUs = require('../models/SKUs');
const multer = require('multer')
const upload = require('./upload')

const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
      // Query the database to find products that are not soft-deleted (deleted_at is null or empty)
      const data = await Product.find({ deleted_at: null }).sort({ created_at: -1 });
      console.log(data);
      res.json(data);
    } catch (err) {
      next(err);
    }
  });
  

router.get('/onePro/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Product.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})


router.get('/oneSKUs/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await SKUs.find({Products_idProducts:id})
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
        const currentTime = new Date();
        const data = await Product.findById(id).updateOne({
            $set: {
                type,
                productName,
                productDesc,
                thumbnail:base64,
                updated_at: currentTime,
            }
        })
        // console.log("objectID:=>"+objectId(id))
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/deletePro/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;
    
        // Find the product by ID and update the deleted_at field with a timestamp
        const product = await Product.findByIdAndUpdate(
          productId,
          { deleted_at: new Date() },
          { new: true }
        );
    
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        res.json({ message: 'Product has been soft deleted' });
      } catch (err) {
        next(err);
      }
  });

module.exports = router