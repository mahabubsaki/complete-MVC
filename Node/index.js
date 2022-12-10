//imported http for using the nodejs server which is a core module
//const http = require('http');
//imported filesystem to do some actions with file which is also a core module
//const fs = require('fs');
//const routes = require('./routes');

//createServer is a method which needs a a callback function which have req and res as parameter
//const server = http.createServer(routes);

//listening server on 500 port

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoutes = require('./Routes/admin');
const sellerRoutes = require('./Routes/seller');
const commonRoutes = require('./Routes/common');
const userRoutes = require('./Routes/user');
const path = require('path');
const rootDirectory = require('./Helpers/path');


// app.use(express.json());
app.use(bodyParser.json()); // for parsing json
app.use(bodyParser.urlencoded({ extended: false })); //for parsing form data
/**
 * ? For getting the data from frontend we have two middlewares.bodyparser json and express json. We are using bodyparser 
*/
app.use('/admin', adminRoutes);
app.use('/seller', sellerRoutes);
app.use('/common', commonRoutes);
app.use('/user', userRoutes);
/**
 * ? by using the imported router from each file we can control our endpoints from any file with app.use . If we have to add a common endpoint like above we can add first while using middlewares
*/
app.use(express.static(path.join(rootDirectory, 'Public')));
/**
 * ? If we want to give access to our client a static file, than we have to use the express.static middleware.In the express.static we have to give the path of the folder where we have all the files we want to give access to client.
*/


app.get('/', (req, res, next) => {
    res.send("<h1>Server is running on 5000 Port</h1>");
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDirectory, 'Views', '404.html'));
});

app.listen(5000, () => {
    console.log('Server running on ' + 5000 + ' Port');
});