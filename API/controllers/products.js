const Product = require('../db/models/Products');
const fs = require('fs')
exports.ADD_PRODUCT = (req, res, next) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        price: req.body.price,
        productImage: req.file.path,
    })

    newProduct.save()
    .then(product => {
        res.status(200).json({ success: true, message: 'Product Created Sccessfully', data: product})
    })
    .catch(err => {
        res.status(401).json({success: false, Error: 'Product Creating error:', err})
    }) 
}

exports.GET_ALL_PRODUCTS = (req, res, next) => {
    Product.find()
    .exec()
    .then(products => {
        if(products.length < 0) {
            res.status(402).json({success: false, message: 'Product not found'})
        } 
        res.status(200).json({success: true, data: products})
    })
}