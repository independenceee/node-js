const express = require("express");
const EmployeeController = require("../controllers/EmployeeController")
const verifyRoles = require("../middlewares/verifyRoles");
const ROLE_LIST = require("../configs/roleList");


const router = express.Router();

router.route("/")
        .get(EmployeeController.getAllEmployees)
        .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),EmployeeController.createNewEmployee);
router.route("/:id")
        .get(EmployeeController.getEmployee)
        .delete(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),EmployeeController.deleteEmployee)
        .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), EmployeeController.updateEmployee);

module.exports = router;