const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/Users')


router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/',async (req,res,next)=>{
    try {
        const data = await User.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addUser', async (req, res, next) => {
    try {
        const data = await User.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router