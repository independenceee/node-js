const taskRouter = require("./task");

const router = function (app) {
  app.use("/tasks", taskRouter);
};

module.exports = router;
