const express = require("express");
const passport = require("passport");


require("./auth");


const app = express();

app.get("/", (request, response) => {
    response.send(`<a href="/auth/google">Google</a>`)
})


app.get("/auth/google",passport.authenticate("google", {
    scope:['email', 'profile']
}))

app.get("/protected", (request, response) => {
    response.send("Hello")
})

app.listen(8000, function() {
    return console.log(8000);
});