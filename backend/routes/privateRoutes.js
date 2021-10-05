const express = require("express");
const router = express.Router();
const { getPrivateData } = require('../controller/privateControllers');
const { protect } = require('../middleware/auth')

router.route("/").get(getPrivateData);

module.exports = router;