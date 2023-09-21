const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SKUs = require('../models/SKUs')
const { ObjectId } = require('mongodb');

const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await Product.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/oneSKUs/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await SKUs.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addSKUs', async (req, res, next) => {
    try {
        const data = await SKUs.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})