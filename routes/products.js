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
  
      // ขั้นตอนที่ 1: ค้นหาสินค้าและเติมข้อมูล SKU ที่เกี่ยวข้อง
      const product = await Product.findById(productId).populate('idSKU');
  
      if (!product) {
        return res.status(404).json({ message: 'ไม่พบสินค้า' });
      }
  
      // ขั้นตอนที่ 2: ลบ SKU ที่เกี่ยวข้อง
      for (const sku of product.idSKU) {
        await SKUs.findByIdAndDelete(sku);
      }
  
      // ขั้นตอนที่ 3: ลบสินค้าเอง
      await Product.findByIdAndDelete(productId);
  
      res.json({ message: 'ลบสินค้าและ SKU ที่เกี่ยวข้องสำเร็จ' });
    } catch (err) {
      next(err);
    }
  });

module.exports = router