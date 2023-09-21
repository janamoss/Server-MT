const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const categories = require('../models/Categories')
const { ObjectId } = require('mongodb');

const objectId = new ObjectId();

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await categories.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/onecategories/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await categories.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addcategories', async (req, res, next) => {
    try {
        const data = await categories.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})