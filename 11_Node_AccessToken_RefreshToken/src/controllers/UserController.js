const User = require("../models/User");


class UserController {
    constructor() {

    }

    async getALlUsers(request, response) {
        try {
            const users = await User.find();
            if(!users) {
                return response.status(404).json({
                    message: "User not found !",
                })
            }
            response.status(200).json(users);
        } catch(error) {
            response.status(500).json({
                message: error,
            })
        }
    }

    async deleteUser(request, response) {
        try {
            const { id } = request.params;
            if(!id) {
                return response.status(404).json({
                    message: 'User not found',
                })
            }

            const user = await User.findOne({
                _id: id,
            }).exec();
            if(!user) {
                return response.status(204).json({
                    message: "User not found"
                })
            }
            const result = await user.deleteOne({
                _id: id,
            })

            response.status(200).json(
                result
            );
        } catch(error) {
            response.status(500).json({
                message: error,
            })
        }
    }

    async getUser(request, response) {
        try {
            const { id } = request.params;
            if(!id) {
                return response.status(404).json({
                    message: 'User not found',
                })
            }

            const user = await User.findOne({
                _id: id,
            }).exec();
            if(!user) {
                return response.status(204).json({
                    message: "User not found"
                })
            }
            response.status(200).json(user);
        } catch(error) {
            response.status(500).json({
                message: error,
            })
        }
    }
}

module.exports = new UserController();