const express = require("express");
const router = express.Router();


router.post("/", function(request, response) {
    const {name} = request.body;

    if(name) {
        return response.status(200).send(`Welcome ${name}`);
    }

    response.status(401).send("Please enter your name");
})


module.exports = router;