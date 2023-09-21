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

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).json({ message: 'มีคนใช้อีเมลนี้ไปแล้ว กรุณาลองใหม่อีกครั้งค่ะ.' });
            return;
        }
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

router.post('/login' ,async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.status(404).send({
                message: 'user not found'
            })
        }

        if (!await bcrypt.compare(req.body.password, user.password)){
            return res.status(404).send({
                message: 'invalid credentials'
            })
        }

        res.send(user)
    } catch (err) {
        next(err)
    }
})

module.exports = router