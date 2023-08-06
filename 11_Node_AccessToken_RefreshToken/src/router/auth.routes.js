const { Router } = require("express");
const {
    login,
    logout,
    register,
    refresh,
} = require("../controllers/auth.controller");
const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/refresh").post(refresh);

module.exports = router;
