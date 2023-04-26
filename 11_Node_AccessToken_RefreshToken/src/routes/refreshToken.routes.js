const express = require("express");
const router = express.Router();

const RefreshTokenController = require("../controllers/RefreshTokenController");

router.route("/").get(RefreshTokenController.handleRefreshToekn);

module.exports = router;