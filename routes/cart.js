const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const cart = require('../models/Cart_item')
const User = require('../models/Users')

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

module.exports = router