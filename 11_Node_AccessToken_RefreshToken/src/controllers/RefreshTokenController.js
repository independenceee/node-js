const jwt = require("jsonwebtoken");
const User = require("../models/User");


class RefreshTokenController {
    async handleRefreshToekn(request, response) {
        try {
            const cookies = request.cookies;
            if(!cookies?.jwt) {
                return response.sendStatus(404);
            }
            const refreshToken = cookies.jwt;
            response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            const foundUser = await User.findOne({ refreshToken }).exec();

            if (!foundUser) {
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) return res.sendStatus(403); //Forbidden
                        console.log('attempted refresh token reuse!')
                        const hackedUser = await User.findOne({ username: decoded.username }).exec();
                        hackedUser.refreshToken = [];
                        const result = await hackedUser.save();
                        console.log(result);
                    }
                )
                return response.sendStatus(403); //Forbidde
            }


            const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

            // evaluate jwt 
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (error, decoded) => {
                    if (error) {
                        console.log('expired refresh token')
                        foundUser.refreshToken = [...newRefreshTokenArray];
                        const result = await foundUser.save();
                        console.log(result);
                    }
                    if (error || foundUser.username !== decoded.username) return response.sendStatus(403);
        
                    // Refresh token was still valid
                    const roles = Object.values(foundUser.roles);
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "username": decoded.username,
                                "roles": roles
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '10s' }
                    );
        
                    const newRefreshToken = jwt.sign(
                        { "username": foundUser.username },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );
                    // Saving refreshToken with current user
                    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                    const result = await foundUser.save();
        
                    // Creates Secure Cookie with refresh token
                    response.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        
                    response.json({ roles, accessToken })
                }
            );
        }catch(error) {
            response.status(500).json({
                message: error.message,
            })
        }
    }
}

module.exports = new RefreshTokenController();
