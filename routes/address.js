const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Address = require('../models/Address')
const User = require('../models/Users')


router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/',async (req,res,next)=>{
    try {
        const data = await Address.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addAddress', async (req, res, next) => {
    try {
        const data = await Address.create(req.body)
        const user = await User.findOne({ _id: req.user._id })
        user.Address_idAddress.push(data._id)
        await user.save();
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})


module.exports = router