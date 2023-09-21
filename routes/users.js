const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/Users')

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/register',async (req,res,next)=>{
    try {
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)        

        const namedata = await User.find()
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword,
        })

        const result = await user.save()

        const {password, ...data} = await result.toJSON()
        
        res.send(data)

        // const data = await User.find()
        // console.log(data)
        // res.json(data)
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

router.post

module.exports = router