const express = require('express'),
    router = express.Router(),
    contactController = require('../controllers/contacts.controller');

/*
* @route  GET api/contacts
* @desc   Get user contacts
* @access Private
* */
router.get('/', contactController.getUserContacts);

/*
* @route  Post api/contacts
* @desc   Post user contacts
* @access Private
* */
router.post('/', contactController.postAddNewContact);

/*
* @route  PUT api/contacts/:id
* @desc   Update user contact
* @access Private
* */
router.put('/:id', contactController.updateUserContact);

/*
* @route  DELETE api/contacts/:id
* @desc   Delete user contact
* @access Private
* */
router.delete('/:id', contactController.deleteUserContact);

module.exports = router;
