const jwt = require("jsonwebtoken");

const verifyJsonWebToken = function(request, response, next) {
    const authHeader = request.headers.authorization || request.headers.Authorization ;
    console.log(authHeader)
    if (!authHeader?.startsWith('Bearer ')) return response.sendStatus(401);
    
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) return response.sendStatus(403); //invalid token
            request.user = decoded.UserInfo.username;
            request.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJsonWebToken;