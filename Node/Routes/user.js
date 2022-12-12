const express = require('express');
const path = require('path'); //core module of nodejs
const router = express.Router();
const rootDirectory = require('../Helpers/path');
const { allProducts } = require('./admin');
/**
 * ? We are importing the variables which will point to the root directory of every project
*/


router.get('/products', (req, res, next) => {
    // console.log(allProducts);
    // res.sendFile(path.join(rootDirectory, 'Views', 'products.html'));
    res.render('products.ejs', { allProducts, title: 'All Products' }); //  
    /**
   * ! res.render is a method to send template engine files as response
  * ? It's first parameter is the filename which we want to send and second parameter should be an object where we want to pass all the data for sharing and using
  */
});
/**
 * ! we can actually send a html file as a response.We have to use res.sendFile method
 * ? While sending a file we have to reach the path of file. So we are using a core module of nodejs to surf the filepath which name is path.
 * ? using path.join method becuase paths are different on each operating system.
 * ? path.join methods first argument should be __dirname, by using this we are pointing to the exact path where we writing this. As now we are in Routes folder. To send a file we have to go back one step and find the folder where our html folder exist. So '../' for one step back, Views for the folder name where the products.html exist.
 * ? As we are getting the rootdirectory with a variable, we can easily use that without __dirname
*/
module.exports = router;