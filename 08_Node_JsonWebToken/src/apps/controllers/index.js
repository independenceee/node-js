const jwt = require("jsonwebtoken");
require("dotenv").config();


const login = async function(request, response) {
    const {username, password} = request.body;

    if(!username || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const id = new Date().getDate();
    const token = jwt.sign({id , username},process.env.JWT_SECRET, {
        expiresIn: "30d",
    } )
    response.sattus(200).json({
        token: token,
    })
}

const dashboard = async function(request, response) {
    const luckyNumber = Math.floor(Math.random() *100);

    response.status(200).json({
        token: token,
    })
}


module.exports = {
    login, dashboard
}