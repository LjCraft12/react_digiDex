const express = require('express'),
    router = express.Router(),
    contactController = require('../controllers/contacts.controller'),
    {check} = require('express-validator'),
    auth = require('../middleware/auth');

/*
* @route  GET api/contacts
* @desc   Get user contacts
* @access Private
* */
router.get('/', auth, contactController.getUserContacts);

/*
* @route  Post api/contacts
* @desc   Post user contacts
* @access Private
* */
router.post('/', auth, [
    check('name', 'Please enter a name').not().isEmpty()
], contactController.postAddNewContact);

/*
* @route  PUT api/contacts/:id
* @desc   Update user contact
* @access Private
* */
router.put('/:id', auth, contactController.updateUserContact);

/*
* @route  DELETE api/contacts/:id
* @desc   Delete user contact
* @access Private
* */
router.delete('/:id', auth, contactController.deleteUserContact);

module.exports = router;
