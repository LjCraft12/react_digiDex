const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user.controller'),
    {check} = require('express-validator');

/*
* @route  POST api/users
* @desc   Register a user
* @access Public
* */
router.post('/', [
    // Check to make sure a name was passed from the posted body
    check('name', 'Name is requires').not().isEmpty(),
    // Check to make sure a valid email was passed from the posted body
    check('email', 'Please include a valid email').isEmail(),
    // Check for password length of at least 6 characters from the posted body
    check('password', "Please enter a password with 6 or more characters").isLength({min: 6})
], userController.postRegistration);


module.exports = router;
