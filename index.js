//imported http for using the nodejs server which is a core module
const http = require('http');
//imported filesystem to do some actions with file which is also a core module
const fs = require('fs');
const routes = require('./routes');

//createServer is a method which needs a a callback function which have req and res as parameter
const server = http.createServer(routes);

//listening server on 500 port
server.listen(5000);