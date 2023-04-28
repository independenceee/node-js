const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class AuthController {
    constructor() {

    }

    async register(request, response) {
        const {username, password } = request.body;
        if(!username || !password) {
            return response.status(404).json({
                message: "Username and password are required.",
            })
        }

        const duplicate = await User.findOne({
            username: username,
        }).exec();

        if(duplicate) {
            return response.status(404).json({
                message: "User already exists !",
            })
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
           
            const result = await User.create({
                username: username,
                password: hashedPassword,
            })


            response.status(200).json({
                message: `New user ${username} created`,
            })
        } catch(error) {
            response.status(500).json({
                message: error.message,
            })
        }
    }

    async login(request, response) {
        try {
            const cookies = request.cookies;
            const { username, password} = request.body;

            if(!username || !password) {
                return response.status('404').json({
                    message: "Username and password are required",
                })
            }

            const foundUser = await User.findOne({
                username: username,
            }).exec();

            if(!foundUser) {
                return response.status(401).json({
                    message: "User not found!"
                })
            }

            const match = await bcrypt.compare(password, foundUser.password);

            if(match) {
                const roles = Object.values(foundUser.roles).filter(Boolean);

                const accessToken = jwt.sign(
                    {
                        UserInfo : {
                            username: foundUser.username,
                            roles: roles,
                        }
                    }, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '10s'
                    }
                );
                const newRefreshToken = jwt.sign(
                    { username: foundUser.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1y' }
                );

                let newRefreshTokenArray =
                !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

                if (cookies?.jwt) {

                
                    const refreshToken = cookies.jwt;
                    const foundToken = await User.findOne({ refreshToken }).exec();
        
                   
                    if (!foundToken) {
                        console.log('attempted refresh token reuse at login!')
                        newRefreshTokenArray = [];
                    }
        
                    response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                }

                foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                const result = await foundUser.save();
                response.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

                response.json({ roles, accessToken });
            }
        } catch(error) {
            response.status(500).json({
                message: error.message,
            })
        }
    }


    async logout(request, response) {
        try {
            const cookies = request.cookies;
            if (!cookies?.jwt) return response.sendStatus(204);
            const refreshToken = cookies.jwt;

            const foundUser = await User.findOne({ refreshToken }).exec();
            if (!foundUser) {
                response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                return response.sendStatus(204);
            }
            foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
            const result = await foundUser.save();
        
            response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            response.sendStatus(204);
        } catch(error) {
            response.status(500).json({
                message: error.message,
            })
        }
    }
}

module.exports = new AuthController()