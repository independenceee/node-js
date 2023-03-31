const express = require("express");
const path = require("path");


const app = express();


app.use(express.static("/public"));


app.all("*", function(request, response) {
    response.status(404).send("Page not found");
})

app.listen(5000, function() {
    console.log("http://localhost:5000")
})