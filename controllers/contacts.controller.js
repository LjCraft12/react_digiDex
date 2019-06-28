const {validationResult} = require('express-validator'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/User'),
    Contact = require('../models/Contact');

/*
*  @route  GET api/contacts
*  @desc   Get user contacts
*  @access Private
* */
exports.getUserContacts = async (req, res) => {
    try {
        // Find all contacts of the logged in user
        const contact = await Contact.find({user: req.user.id}).sort({date: -1});
        res.status(200).json(contact)
    } catch (err) {
        // Catch any errors from the DB when retrieving user contacts
        console.error(err.message);
        res.status(500).send({message: 'Server Error'});
    }
};

/*
*  @route  POST api/contacts
*  @desc   Add contact to user
*  @access Private
* */
exports.postAddNewContact = async (req, res) => {
    // Check for any errors passed in to the errors array routes/contact.js when adding a new contact
    const errors = validationResult(req);
    // If any errors are found return the errors array
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // If no errors extract name, email, phone, and type of contact from the request body
    const {name, email, phone, type} = req.body;

    try {
        // Create a new contact from the posted body and set the user to the logged in user
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        });

        // Save the contact to the DB
        const contact = await newContact.save();
        res.json(contact)

        // Catch any server errors from the DB
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
/*
*  @route  PUT api/contacts/:id
*  @desc   Edit user contact
*  @access Private
* */
exports.updateUserContact = async (req, res) => {
    const {name, email, phone, type} = req.body;

    // Create contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found'});

        // Verify contact retrieved belongs to the user
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized user action'});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true});
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

/*
*  @route  DELETE api/contacts/:id
*  @desc   Delete contact from user
*  @access Private
* */
exports.deleteUserContact = async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found'});

        // Verify contact to be deleted belongs to the user
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized user action'});
        }
        await Contact.findByIdAndRemove(contact);
        res.json({ message: 'Contact deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
