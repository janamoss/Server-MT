const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Orderdetail = require('../models/OrderDetail')


router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/',async (req,res,next)=>{
    try {
        const data = await Orderdetail.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addOrder', async (req, res, next) => {
    try {
        const data = await Orderdetail.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router