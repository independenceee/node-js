const express = require("express");
const { removeAllListeners } = require("nodemon");
const app = express();




app.get("/", function(request , response) {
    response.status(200).json({
        message: "Home page"
    })
})


app.get("/about", function(request , response) {
    response.status(200).json({
        message: "About page"
    })
})


app.all('*', function(request, response) {
    response.status(404).json({
        message: "Page not found"   
    })
})


const PORT = 5000;
app.listen(PORT, function() {
    return console.log(`http://localhost:${PORT}`)
})

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen