const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Auth {
    async register(request, response) {
        try {
            const { email, password } = request.body;
            if (!email || !password) {
                return response.status(404).json({
                    message: "email and password are required.",
                });
            }
            const duplicate = await User.findOne({
                email: email,
            }).exec();
            if (duplicate) {
                return response.status(404).json({
                    message: "User already exists !",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await User.create({
                email: email,
                password: hashedPassword,
            });

            response.status(200).json({
                message: `New user ${email} created`,
            });
        } catch (error) {
            response.status(500).json({
                message: error.message,
            });
        }
    }

    async login(request, response) {
        try {
            const { email, password } = request.body;
            if (!email || !password) {
                return response.status(404).json({
                    message: "email and password are required.",
                });
            }

            const foundUser = await User.findOne({
                email: email,
            }).exec();

            if (!foundUser) {
                response.status(400).json({
                    message: "Unauthorized",
                });
            }

            const match = await bcrypt.compare(password, foundUser.password);
            if (!match) {
                return response.status(400).json({
                    message: "Unauthorized",
                });
            }

            const accessToken = jwt.sign(
                {
                    email: foundUser.email,
                    roles: "USER",
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "10s",
                },
            );
            const refreshToken = jwt.sign(
                {
                    email: foundUser.email,
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "365d",
                },
            );

            response.cookie("jwt", refreshToken, {
                secure: true,
                sameSite: "None",
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            response.status(200).json({
                accessToken,
            });
        } catch (error) {
            response.status(500).json({
                message: error.message,
            });
        }
    }

    async refresh(request, response) {
        const { jwts } = request.body;

        console.log(jwt);
        if (!jwts) {
            return response.status(400).json({
                message: "Unauthorized",
            });
        }

        const refreshToken = jwts;

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async function (error, decoded) {
                if (error) {
                    return response.status(400).json({
                        message: "Unauthorized",
                    });
                }

                const foundUser = await User.findOne({
                    email: decoded.email,
                }).exec();

                if (!foundUser) {
                    return response
                        .status(401)
                        .json({ message: "Unauthorized" });
                }

                const accessToken = jwt.sign(
                    {
                        email: foundUser.email,
                        roles: "User",
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" },
                );

                response.json({ accessToken });
            },
        );
    }

    async logout(request, response) {
        const cookies = request.cookies;

        if (!cookies.jwt) {
            return response.status(200);
        }
        response.clearCookie("jwt", {
            secure: true,
            sameSite: "None",
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        response.status(200).json({
            message: "Clear Cookies",
        });
    }
}

module.exports = new Auth();
