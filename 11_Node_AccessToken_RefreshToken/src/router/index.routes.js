const authRouter = require("./auth.routes");

const router = function (app) {
    app.use("/auth", authRouter);
};

module.exports = router;
