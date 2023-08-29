const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 9000;

io.on("connection", function(socket) {
    socket.emit("Hello", "World")

    socket.on("howdy", function(args) {
        console.log(args)
    })
})


server.listen(PORT, function() {
    console.log(`http://localhost:${PORT}`)
})