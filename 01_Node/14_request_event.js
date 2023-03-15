const http = require("http");

const server = http.createServer();

server.on("request", function(request, response) {
    response.end("Welcome");
})

server.listen(5000, function() {
    console.log(`http://localhost:${5000}`);
})