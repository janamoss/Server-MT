const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cart = require('../models/Cart_item');
const User = require('../models/Users');

const { ObjectId } = require('mongodb');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// GET all cart items
router.get('/', async (req, res, next) => {
    try {
        const data = await cart.find();
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// POST add item to cart or create a new cart
router.post('/addcart/', async (req, res, next) => {
    try {
        const { Users_idUsers, SKUs } = req.body;

        // Check if a cart exists for the user
        let userCart = await cart.findOne({ Users_idUsers });

        if (!userCart) {
            // If no cart exists for the user, create a new one
            userCart = await cart.create({ Users_idUsers, SKUs });
        } else {
            // If a cart exists for the user, check for existing SKUs
            const existingSKUs = userCart.SKUs;

            for (const newSKU of SKUs) {
                // Check if the SKU already exists in the cart based on _id and size
                const matchingSKU = existingSKUs.find(
                    sku => sku._id.toString() === newSKU._id && sku.size === newSKU.size
                );

                if (matchingSKU) {
                    // If SKU exists, increase the quantity
                    matchingSKU.qty += newSKU.qty;
                } else {
                    // If SKU doesn't exist, add the new SKU
                    existingSKUs.push(newSKU);
                }
            }

            // Update the cart with the modified SKUs
            userCart.SKUs = existingSKUs;
            await userCart.save();
        }

        // Return the updated cart in the response
        res.status(200).json(userCart);
    } catch (err) {
        next(err);
    }
});




// GET cart items for a specific user
router.get('/showcart/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const data = await cart.find({ Users_idUsers: userId });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// DELETE an item from the cart
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const cartItemId = req.params.id;
        let cartexist = await cart.findById(cartItemId);
        if (!cartexist) {
            res.json("No cart found");
        }
        const data = await cart.findByIdAndDelete(cartItemId);
        res.json("Deleted successfully");
    } catch (err) {
        console.log(err)
        next(err);
    }
});

module.exports = router;
