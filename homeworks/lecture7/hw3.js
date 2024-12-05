/**
 * For sample code web-server.js, make the following changes:
 * Once submitting in home.html, stay on the same page and display the submitted data.
 * 
 * Hint:
 * 1. put the data of the submitted form in the query string of the url
 * 2. before res.end() in POST method, redirect to the home.html page with the query string
 *  - i.e. res.statusCode = 302; res.setHeader('Location', '/home.html?name=John&age=20');
 * 3. you need to figure out how to parse the query string in the home.html page
 * 4. after writing the html content, you need to write the query string in the html as well
 */


const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
    const {url, method} = req;
    if(method === 'GET') {
        if(url === '/') {
            res.end('this is the home page');
        } else if(url === '/about') {
            res.end('this is the about page');
        } else if(url.startsWith('/home.html')) {
            fs.readFile(path.join(__dirname, 'home.html'), (err, html) => {
                if(err) {
                    res.end("error loading page")
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(html);
                    res.end();
                }
            });
        } else {
            res.end('404 Not Found');
        }
    } else if(method === 'POST') {
        if(url === '/create-post') {
            let body = [];
            req.on('data', chunk => {
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const formData = new URLSearchParams(parsedBody);

                const newHtml = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>My Home Page</title>
                    </head>
                    <body>
                        <h1>Welcome to My Home Page</h1>
                        <form action="/create-post" method="post">
                            <input type="text" name="title" placeholder="Title" required>
                            <input type="text" name="content" placeholder="Content" required>
                            <input type="submit" value="Submit">
                        </form>
                        <h2>Submitted Data:</h2>
                        <p><strong>Title:</strong> ${formData.get('title')}</p>
                        <p><strong>Content:</strong> ${formData.get('content')}</p>
                    </body>
                    </html>
                `;
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(newHtml);
            });
        } else {
            res.end('404 Not Found');
        }
    } else {
        res.end('Unsupported method');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
