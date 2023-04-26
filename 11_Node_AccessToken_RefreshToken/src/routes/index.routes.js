const authRouter = require("./auth.routes")
const employeeRouter = require("./employee.routes");
const userRouter = require("./user.routes");
const refreshTokenRouter = require("./refreshToken.routes");
const verifyJsonWebToken = require("../middlewares/verifyJsonWebToken")

const router = function(app) {
    
    app.use("/auth", authRouter);
    app.use("/refresh-token", refreshTokenRouter);
    app.use(verifyJsonWebToken);
    app.use("/user", userRouter);
    app.use("/employee", employeeRouter);

}

module.exports = router;