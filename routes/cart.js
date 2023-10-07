const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const cart = require('../models/Cart_item')
const User = require('../models/Users')
const SKUs = require('../models/SKUs')

const { ObjectId } = require('mongodb');

const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await cart.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})


router.post('/addcart', async (req, res, next) => {
    try {
        const data = await cart.create(req.body)
        // const user = await User.findOne({ _id: req.body.Users_idUsers });
        // user.Address_idAddress.push(data._id);
        // await user.save();
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})
//มาแค่ id
// router.put('/addskus/:cartId', async (req, res, next) => {
//     const cartId = req.params.cartId;
//     const skuId = req.body.SKUs[0]._id; // ดึง ObjectId ของ SKU ออกมาจากข้อมูลที่ส่งมา

//     try {
//       const existingCart = await cart.findOne({ _id: cartId });

//       if (!existingCart) {
//         return res.status(404).json({ message: 'ไม่พบ cart ที่ตรงกับ id ที่ระบุ' });
//       }

//       // ค้นหาข้อมูล SKU จากคอลเลคชัน SKUs และ populate ข้อมูล
//       const skuData = await SKUs.findById(skuId);

//       if (!skuData) {
//         return res.status(404).json({ message: 'ไม่พบ SKU ที่ตรงกับ id ที่ระบุ' });
//       }

//       // เพิ่มข้อมูล SKU ลงใน existingCart.SKUs
//       existingCart.SKUs.push(skuData);

//       const updatedCart = await existingCart.save();

//       res.json(updatedCart);
//     } catch (err) {
//       next(err);
//     }
//   });

router.put('/addskus/:cartId', async (req, res, next) => {
    const cartId = req.params.cartId;
    const skusData = req.body.SKUs;
    
    try {
        const existingCart = await cart.findOne({ _id: cartId });

        if (!existingCart) {
            return res.status(404).json({ message: 'ไม่พบ cart ที่ตรงกับ id ที่ระบุ' });
        }

        // วนลูปเพื่อเพิ่มข้อมูล SKU ลงใน existingCart.SKUs
        skusData.forEach((skuItem) => {
            existingCart.SKUs.push(skuItem);
        });

        const updatedCart = await existingCart.save();

        res.json(updatedCart);
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/sku/:cartId/:skuId', async (req, res, next) => {
    const cartId = req.params.cartId;
    const skuId = req.params.skuId;
    // const skuId = mongoose.Types.ObjectId(req.params.skuId);

    try {
        const existingCart = await cart.findOne({ _id: cartId });

        if (!existingCart) {
            return res.status(404).json({ message: 'ไม่พบ cart ที่ตรงกับ id ที่ระบุ' });
        }

        // ค้นหา Index ของ sku ที่ต้องการลบใน existingCart.SKUs
        // const skuIndex = existingCart.SKUs.findIndex((skus) => skus._id === skuId);
        const skuIndex = existingCart.SKUs.findIndex((sku) => sku._id.equals(skuId));

        if (skuIndex === -1) {
            return res.status(404).json({ message: 'ไม่พบ SKU ที่ตรงกับ id ที่ระบุใน cart นี้' });
        }

        // ลบ sku ออกจาก existingCart.SKUs โดยใช้ splice
        existingCart.SKUs.splice(skuIndex, 1);

        const updatedCart = await existingCart.save();

        res.json(updatedCart);
    } catch (err) {
        next(err);
    }
});


module.exports = router