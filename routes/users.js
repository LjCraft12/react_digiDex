const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user.controller');

/*
* @route  POST api/users
* @desc   Register a user
* @access Public
* */
router.post('/', userController.postRegistration);


module.exports = router;
