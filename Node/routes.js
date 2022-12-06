const fs = require('fs');
/**
     * ! req contains some information about the client from where we sent request like the url hitted, method from client and the headers
     * todo: req.url, req.method, req.headers
     */
/**
 * ! for stopping the server once hitted by client
 * todo: process.exit()
 */
/**
* ! by setHeader method we are telling that the response text needs to converted into html markup
* todo: res.setHeader('Content-Type', 'text/html')
*/
/**
* ! We can write some html code from our server
* ? Writing html code should be in proper markup which we write in html file. Example :
* ? res.write('<html>')
* ? res.write('<head><title>My Title</title><head>');
* ? res.write('<body><h1>My Content</h1></body>');
* ? res.write('</html>');
* todo: res.write('<some html code/>')
*/
/**
 * ! if we call end method than we can't write anything after calling
 * todo: res.end()
 */
/**
 * ! We can create a file synchornysly in our system by using writeFileSync method.
 * ? This method expect two arguments. First one is file name. Second one is the content we should put in that.Here is a problem. This method runs synchornysly which means excecution will be stop untill this process finishes.So we should use writeFile method instead of this
 * todo: fs.writeFileSync('message.txt', 'Mahabub Saki')
 */
/**
* ! We can redirect a client by using setHeader method.
* ? setHeader requires two arguments. First one should be Location for redirect purpose. Second one is the path where we want to redirect. Note: We have to give a statuscode before redirect.
* todo: res.statusCode = 302 and res.setHeader('Location', '/');
*/
/**
  * ! We can get our formdata as chunk and store it for further parsing.
  * ? We have to use req.on event listener to read the chunk first.Here event listener used because data can be larger so it needs some time for recieving the data.Once recieved data as chunk then we can use it
  * ? req.on('data', (chunk) => { body.push(chunk)});
  * ? We are pushing into array because we have to parse it with buffer and that requires an array
  * ? If we want to use the chunk, we have to do it on another event listener
  * ? req.on('close', () => {//here we can use our chunk})
  * todo: req.on('data',(chunk)=>{ }) and req.on('close',()=>{ })
  */
/**
* ! We can parse our formdata with Buffer classs
* ? if Formdata is encoded in chunk we can decod it with Buffer.concat() method. Buffer.concat() expects a argument where chunk will be in an array.After concatinating we have to use toString() method to convert into string
* todo: Buffer.concat(<chunk in array>:[chunk]).toString()
*/
/**
* !  We can create a file asynchornysly in our system by using writeFile method.
* ? This methods first two arguments are same as writeFileSync. But the third one is a callback which excecute after creating the file. The callback contains an error parameter so we can handle if an error occurs.
* todo: fs.writeFile('message.txt','Mahabub Saki',(err)=>{})
*/


const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>User Information</title></head>');
        res.write('<form action="/message" method="POST"><input type="text" name="name"/><button type="submit">Send</button></form>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('close', () => {
            fs.writeFile('message.txt', Buffer.concat(body).toString().split('=')[1], (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.write('<html>');
    res.write('<head><title>404 Not Found</title></head>');
    res.write('<body><h1>Are you lost?</h1><body>');
    res.write('</html>');
    return res.end();
};
module.exports = requestHandler;
