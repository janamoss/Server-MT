// const express = require('express')
// const router = express.Router()
// const mongoose = require('mongoose')
// const Product = require('../models/Products')
// const productcontroller = require('../controllers/productcontroller.js')
// const { ObjectId } = require('mongodb');
// const { upload } = require("../middlewares/uploadimg.js");
// const objectId = new ObjectId();

// router.use(express.json())
// router.use(express.urlencoded({ extended: false }))

// router.get('/', productcontroller.seachPRo)
// router.get('/onePro/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id
//         const data = await Product.findById(id)
//         res.json(data)
//     } catch (err) {
//         next(err)
//     }
// })
// router.post('/addPro', productcontroller.addProducts)
// router.put('/editPro/:id',productcontroller.editPro )
// router.delete('/deletePro/:id',productcontroller.deletePro)
// router.post("/uploadImage", upload.array("files", 10), productcontroller.uploadImage)

// module.exports = router