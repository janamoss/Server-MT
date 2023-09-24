const asyncHandler = require("express-async-handler");
const Product = require('../models/Products')

// Uplaod Image
const uploadImage = asyncHandler(async (req, res) => {
    try {
        if (req?.files?.length) {
            console.log(req.files);
            let uploadedFiles = req?.files?.map((image) => {
                return { img: image.filename };
            });
            res.status(200).send({
                success: true,
                messsage: "Files Uploaded",
                data: uploadedFiles,
            });
        } else {
            console.log("Something is missing.");
            res.status(400).send({ success: false, messsage: "Send Files." });
        }
    } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, messsage: "Server Error." });
    }
});

const addProducts = asyncHandler(async (req, res) => {
    const ProductsData = new Product({
        type: req.body.type,
        productName: req.body.productName,
        productDesc: req.body.productDesc,
        thumbnail: req.body.thumbnail
    });
    try {
        const sData = await ProductsData.save();
        res.status(200).json({ message: "Category Added", status: "ok" });
    } catch (err) {
        res.status(500).json(err);
    }
});

const seachPRo = async(req, res, next) => {
    try {
        const data = await Product.find()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
}

const editPro = async (req, res, next) => {
    try {
        const id = req.params.id
        const { idProducts, type, productName, productDesc,thumbnail,modelPath} = req.body
        const data = await Product.findById(id).updateOne({
            $set: {
                idProducts: idProducts,
                type: type,
                productName: productName,
                productDesc: productDesc,
                thumbnail:thumbnail,
                modelPath:modelPath
            }
        })

        // console.log("objectID:=>"+objectId(id))
        res.json(data)
    } catch (err) {
        next(err)
    }
}

const deletePro = async (req,res,next)=>{
    try {
        const id = req.params.id
        const data = await Product.findById(id).deleteOne()
        res.json(data)
    } catch (err) {
        next(err)
    }
}

module.export = {
    uploadImage,
    addProducts,
    editPro,
    seachPRo,
    deletePro
};