const express = require("express");
const path = require("path");

const app = express();



app.use(express.static('/public'));
app.get("/", function(request, response) {
    response.sendFile(path.resolve(__dirname, '/public'));
})

app.all("*", function(request, response) {
    response.status(404).json({
        message: "Page in not found",
    })
})

app.listen(5000, function() {
    return console.log("listening on port", 5000)
})