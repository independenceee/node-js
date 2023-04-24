const jwt = require("jsonwebtoken");
const User = require("../models/User");


class RefreshTokenController {
    async handleRefreshToekn(request, response) {
        try {
            
        }catch(error) {
            response.status(500).json({
                message: error.message,
            })
        }
    }
}

module.exports = new RefreshTokenController();
