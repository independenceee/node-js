const express = require("express")
const app = express();


const logger = function(request, response, next) {
    const method = request.method;
    const url = request.url;

    const time = new Date().getFullYear();
    console.log(method, url, time);

    next();
}

app.get('/', logger, (req, res) => {
    res.send('Home')
})

app.get('/about', logger, (req, res) => {
    res.send('About')
})
  
app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})