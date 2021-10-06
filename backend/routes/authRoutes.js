const express = require('express');
const router = express.Router();

const { register, login, forgotpassword, resetpassword, userById } = require('../controller/authControllers');

router.route("/register").post(register);

router.route('/login').post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resettoken").put(resetpassword);

router.route("/userbyid").post(userById);

module.exports = router;