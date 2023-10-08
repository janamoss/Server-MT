const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/Users')
const Address = require('../models/Address');


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

router.get('/detail/:fullname', async (req,res,next)=>{
    try {
        const name = req.params.fullname
        const data = await User.findOne({fullname:name})
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/EditUser/:id', async (req,res,next)=>{
    try {
        const id = req.params.id
        const { fullname, phone, dateOfbirth, gender, relationship, base64 } = req.body;
        const currentTime = new Date();
        const data = await User.findById(id).updateOne({
            $set: {
                fullname, 
                phone, 
                dateOfbirth,
                gender,
                profile_picture:base64,
                relationship,
                updated_at: currentTime,
            }
        })
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        fullname: req.body.fullname,
        phone:req.body.phone,
        dateOfbirth:req.body.dateOfbirth,
        gender:req.body.gender,
        relationship:req.body.relationship,
        
    })

    const result = await user.save()

    const {password, ...data} = result.toJSON()

    res.send(data)
    // res.json(data)
    console.log(data)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    
    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    })
})

router.get('/userExist', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = user.toJSON()

        res.send(data)
        // console.log(data)
    } catch (e) {
        // console.error(e)
        
        return res.status(401).send({
            auth: false
        })
    }
})

router.post('/logout', (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message: "Logout success"
    })
})

// * OLD VERSION

// router.post('/register', async (req, res, next) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);

//         const existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             res.status(400).json({ message: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาลองใหม่อีกครั้ง' });
//             return;
//         }

//         const user = new User({
//             email: req.body.email,
//             password: hashedPassword,
//             fullname: req.body.fullname
//         });

//             const result = await user.save();

//             const { password, ...data } = await result.toJSON();

//             res.send(data);

//     } catch (err) {
//         next(err);
//     }
// })


// * for test add user

// router.post('/addUser', async (req, res, next) => {
//     try {
//         const data = await User.create(req.body)

//         res.json(data)
//     } catch (err) {
//         next(err)
//     }
// })


// * OLDVERSION

// router.post('/login', async (req, res, next) => {
//     try {

//         const user = await User.findOne({ email: req.body.email })

//         if (!user) {
//             return res.status(404).send({
//                 message: 'อีเมลของคุณไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
//             })
//         }else if (!await bcrypt.compare(req.body.password, user.password)) {
//             return res.status(404).send({
//                 message: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
//             })
//         } else {

//             const token = jwt.sign({ _id: user._id, type: user.isAdmin }, "secret")

//             res.cookie("jwt", token, {
//                 // httpOnly: true,
//                 maxAge: 24 * 60 * 60 * 1000,
//                 domain:['http://localhost:3000','http://localhost:8080'],
//             })
//             console.log('login Successfully')
//             res.send(jwt)
//         }

//     } catch (err) {
//         next(err)
//     }
// })

// * OLD VERSION

// router.get('/existUser', async (req, res, next) => {
//     try {
//         const jwtCookie = await req.cookies['jwt'];
//         const decodedToken = jwt.verify(jwtCookie, "secret");
//         const types = decodedToken.type;

//         if (types === true) {
//             console.log('JWT cookie is not present');
//             return res.status(401).send({
//                 message: 'คุณไม่สามารถเข้าสู่หน้านี้ได้'
//             });
//         }

//         if (!decodedToken) {
//             console.log('JWT cookie is invalid');
//             return res.status(401).send({
//                 message: 'ไม่ผ่านการรับรองความถูกต้อง'
//             });
//         }

//         const user = await User.findOne({ _id: decodedToken._id });

//         const { password, ...data } = user.toJSON();

//         // res.send(data);
//         res.json(data)
//     } catch (err) {
//         console.log("User doesn't login")
//         // res.send("User doesn't login")
//         // console.log(err);
//         // next(err);
//     }
// });


router.put('/add/Address/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const addressDocument = await Address.create(req.body);
        const addressId = addressDocument._id;
        await User.updateOne({ _id: userId }, { Address_idAddress: [addressId] });
        console.log(addressDocument)
        res.json(addressDocument)
    } catch (err) {
        next(err)
    }
})

router.put('/editSkus/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { Products_idProducts, color, goldWight, price, cost, base64 } = req.body;
        const currentTime = new Date();
        const data = await SKUs.findById(id).updateOne({
            $set: {
                Products_idProducts,
                color,
                goldWight,
                price,
                cost,
                idPictures:base64,
                updated_at: currentTime,
            }
        })
        // console.log("objectID:=>"+objectId(id))
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router