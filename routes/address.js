const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Address = require('../models/Address')


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
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router