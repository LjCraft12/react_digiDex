const express = require('express'),
    router = express.Router(),
    authController = require('../controllers/auth.controller'),
    {check} = require('express-validator'),
    auth = require('../middleware/auth');

/*
* @route  GET api/auth
* @desc   Get logged in user
* @access Private
* */
router.get('/', auth, authController.getLoggedInUser);

/*
* @route  POST api/auth
* @desc   Auth user and get token
* @access Public
* */
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({min: 6}).exists()
], authController.postLoginUSer);

module.exports = router;
