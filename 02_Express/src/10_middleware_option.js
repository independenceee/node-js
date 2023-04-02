const express = require("express");
const app = express();


const morgan = require("morgan");
const logger = require("./logger");
const authorization = require("./14_router_auth");

app.use(morgan());
app.use(express.static("./public"));


app.get("/", function(request, response) {
    response.send("HOME");
})

app.get('/about', (req, res) => {
    res.send('About')
  })
  app.get('/api/products', (req, res) => {
    res.send('Products')
  })
  app.get('/api/items', (req, res) => {
    console.log(req.user)
    res.send('Items')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
  })