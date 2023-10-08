const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const cart = require('../models/Cart_item')
const User = require('../models/Users')
const SKUs = require('../models/SKUs')

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

router.get('/usercart', async (req, res, next) => {
    try {
        const { Users_idUsers } = req.query
        // const data = await cart.findOne({ Users_idUsers })
        const data = await cart.findOne({ Users_idUsers })
            .populate({
                path: 'SKUs',
                populate: {
                    path: 'SKUs_idSKUs',
                    model: 'SKUs',
                }
            })
            .populate({
                path: 'SKUs.SKUs_idSKUs',
                populate: {
                    path: 'Products_idProducts',
                    model: 'Products'
                }
            });

        res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/usercart/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Assuming you have a 'User' model and want to find cart data by user ID
        const data = await cart.findOne({ Users_idUsers: userId })
            .populate({
                path: 'SKUs',
                populate: {
                    path: 'SKUs_idSKUs',
                    model: 'SKUs',
                }
            })
            .populate({
                path: 'SKUs.SKUs_idSKUs',
                populate: {
                    path: 'Products_idProducts',
                    model: 'Products'
                }
            });

        res.json(data);
    } catch (error) {
        next(error);
    }
});
// router.get('/', async (req, res, next) => {
//     try {
//         const data = await Report.find()
//             .populate('user')
//             .populate('item');
//         console.log(data)
//         res.json(data)

//     } catch (err) {
//         next(err)
//     }
// })

// router.get('/de/:id', async (req, res) => {
//     try {
//         const id = req.params.id;

//         // Find order details by Orders_idOrders and populate the SKUs field
//         const orderDetails = await Orderdetail.find({ Orders_idOrders: id })
//         .populate({
//             path:'SKUs',
//             populate:{
//                 path:'SKUs_idSKUs',
//                 model:'SKUs'
//             }
//         })
//         .populate({
//             path:'SKUs.SKUs_idSKUs',
//             populate:{
//                 path:'Products_idProducts',
//                 model:'Products'
//             }
//         });

//         if (!orderDetails || orderDetails.length === 0) {
//             return res.status(404).json({ error: 'No order details found for the specified Orders_idOrders' });
//         }

//         res.json(orderDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching order details' });
//     }
//   });

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