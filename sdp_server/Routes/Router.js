const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

//--------------------SIGNUP ROUTE---------------------- //
router.post('/signup', authController.signup);
router.post('/providerSignup', authController.providerSignup);



//--------------------SIGNIN ROUTE---------------------- //
router.post('/signin', authController.signin);

module.exports = router;
