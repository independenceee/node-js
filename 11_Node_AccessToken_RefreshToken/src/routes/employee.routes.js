const express = require("express");
const EmployeeController = require("../controllers/EmployeeController")


const router = express.Router();

router.route("/")
        .get(EmployeeController.getAllEmployees)
        .post(EmployeeController.createNewEmployee);
router.route("/:id")
        .get(EmployeeController.getEmployee)
        .delete(EmployeeController.deleteEmployee)
        .patch(EmployeeController.updateEmployee);

module.exports = router;