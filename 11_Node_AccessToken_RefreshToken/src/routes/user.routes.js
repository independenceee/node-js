const express = require("express");
const UserController = require("../controllers/UserController");
const verifyRoles = require("../middlewares/verifyRoles");
const ROLE_LIST = require("../configs/roleList");

const router = express.Router();

router.route("/").get(verifyRoles(ROLE_LIST.User), UserController.getALlUsers);
router.route("/:id")
.get(verifyRoles(ROLE_LIST.Admin),UserController.getUser)
.delete(verifyRoles(ROLE_LIST.Admin),UserController.getALlUsers);


module.exports = router;