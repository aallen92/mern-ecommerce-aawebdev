const express = require('express');
const router = express.Router();

const { register, login, forgotpassword, resetpassword } = require('../controller/authControllers');

router.route("/register").post(register);

router.route('/login').post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resettoken").put(resetpassword);

module.exports = router;