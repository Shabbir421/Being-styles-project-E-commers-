const express=require('express');
const Product=require("../models/Product");
const { protect, admin } = require('../middleware/authMiddleware');


const router=express.Router();

// @route GET /api/admin/products
//desc get all products

router.get('/',protect,admin, async (req, res) => {
    try {
        const products=await Product.find().sort({createdAt: -1});
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route POST /api/admin/products

// router.post('/', async (req, res) => {
//     const {name, price, description, category, image }=req.body;

//     try {
//         const newProduct=new Product({name, price, description, category, image});
//         const createdProduct=await newProduct.save();
//         res.json(createdProduct);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route PUT /api/admin/products/:id

// router.put('/:id', async (req, res) => {
//     const {name, price, description, category, image }=req.body;

//     //create a new object without the _id
//     const updatedProductFields={name, price, description, category, image};

//     try {
//         const updatedProduct=await Product.findByIdAndUpdate(req.params.id, updatedProductFields, {new: true});
//         res.json(updatedProduct);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });



module.exports =router;