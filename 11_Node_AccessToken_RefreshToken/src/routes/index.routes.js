const authRouter = require("./auth.routes")
const employeeRouter = require("./employee.routes");

const router = function(app) {
    
    app.use("/auth", authRouter);
    app.use("/employee", employeeRouter);
}

module.exports = router;