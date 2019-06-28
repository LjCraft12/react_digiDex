const express = require('express'),
    router = express.Router(),
    authController = require('../controllers/auth.controller');

/*
* @route  GET api/auth
* @desc   Get logged in user
* @access Private
* */
router.get('/', authController.getLoggedInUser);

/*
* @route  POST api/auth
* @desc   Auth user and get token
* @access Public
* */
router.post('/', authController.postLoginUSer);

module.exports = router;
