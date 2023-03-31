const express = require("express");
const app = express();

const { products } = require("./data");

app.get("/", function(request, response) {
    response.status(200).json(products);
})


app.listen(5000, function() {
    return console.log("http://localhost:5000")
})