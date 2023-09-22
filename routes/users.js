const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/Users')
const Address = require('../models/Address');


router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.post('/register', async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).json({ message: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาลองใหม่อีกครั้ง' });
            return;
        }

        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            fullname: req.body.fullname
        });

            const result = await user.save();

            const { password, ...data } = await result.toJSON();

            res.send(data);

    } catch (err) {
        next(err);
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


router.put('/add/Address/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const addressDocument = await Address.create(req.body);
        const addressId = addressDocument._id;

        await User.updateOne({ _id: userId }, { Address_idAddress: [addressId] });

        res.send('ข้อมูลที่อยู่ ที่เพิ่มเรียบร้อย');
        // const data = await User.create(req.body)
        // console.log(data)
        // res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).send({
                message: 'อีเมลของคุณไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
            })
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(404).send({
                message: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
            })
        }

        const token = jwt.sign({ _id: user._id, type: user.isAdmin }, "secret")

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,// 1 วัน
        })

        res.send({
            message:"Hello, Welcome"
        })

    } catch (err) {
        next(err)
    }
})

router.get('/user', async (req, res, next) => {
    try {
        const jwtCookie = req.cookies['jwt'];
        const decodedToken = jwt.verify(jwtCookie, "secret");
        const types = decodedToken.type;

        if (types === true) {
            console.log('JWT cookie is not present');
            return res.status(401).send({
                message: 'คุณไม่สามารถเข้าสู่หน้านี้ได้'
            });
        }

        if (!decodedToken) {
            console.log('JWT cookie is invalid');
            return res.status(401).send({
                message: 'ไม่ผ่านการรับรองความถูกต้อง'
            });
        }

        const user = await User.findOne({ _id: decodedToken._id });

        const { password, ...data } = user.toJSON();
        res.send(data);

    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/logout', (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message: "Logout success"
    })
})


module.exports = router