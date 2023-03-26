const http = require("http");


const server = http.createServer(function(request, response) {
    const url = request.url;
    console.log(url);

    if(url === "/") {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.write("<h1>Home Page</h1>");
        response.end();
    } else if(url === "/about") {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.write("<h1>About Page</h1>");
        response.end();
    } else {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.write("<h1>Page not Found</h1>");
        response.end();
    }
})

server.listen(5000);