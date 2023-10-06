const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Ads = require('../models/Address')
const User = require('../models/Users')


router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await Ads.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/user/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Ads.find({ Users_idUsers: id })
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/oneAds/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Ads.findById(id)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/addAddress', async (req, res, next) => {
    try {
        const data = await Ads.create(req.body)
        const user = await User.findOne({ _id: req.body.Users_idUsers });
        user.Address_idAddress.push(data._id);
        await user.save();
        console.log(data);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.delete('/deleteAds/:id', async (req, res, next) => {
    const id = req.params.id; // Get the ID from the request parameters
    try {
        const result = await Ads.findByIdAndDelete(id);
        res.json({ message: 'Address has been deleted' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
});

router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { Users_idUsers, Contact, Address } = req.body;
        const data = await Ads.findById(id).updateOne({
            $set: {
                Users_idUsers,
                Contact,
                Address,
            }
        })
        res.json(data);
    } catch (err) {
        console.error(err); // Log the error for debugging
        next(err);
    }
});

module.exports = router