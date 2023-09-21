const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Student = require('../models/Orders')


router.use(express.json())
router.use(express.urlencoded({ extended: false }))