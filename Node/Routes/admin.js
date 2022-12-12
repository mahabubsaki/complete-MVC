const express = require('express');
const router = express.Router();
const path = require('path');
const rootDirectory = require('../Helpers/path');
const allProducts = [];
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDirectory, 'Views', 'add-product.html'));
    res.render('add-products.ejs', { title: 'Add Product' });
});
router.post('/adding-product', (req, res, next) => {
    allProducts.push({ product: req.body.product });
    console.log(allProducts);
    res.redirect('/admin/add-product');
});

module.exports = { adminRoutes: router, allProducts };