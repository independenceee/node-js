const express = require("express");
const app = express();
const logger = require("./logger");
const authorization = require("./authorization");
app.use([logger, authorization]);

app.get('/', (req, res) => {
    res.send('Home')
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

app.listen(PORT , function() {
    return console.log("http://localhost:5000");
})