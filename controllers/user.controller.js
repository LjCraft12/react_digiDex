const User = require('../models/User'),
    {validationResult} = require('express-validator'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken');

exports.postRegistration = async (req, res) => {
    // Check for any errors passed in to the errors array routes/users.js
    const errors = validationResult(req);
    // If any errors are found return the errors array
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // If no errors extract name, email, password from the request body
    const {name, email, password} = req.body;

    try {
        // Check for email already in DB
        let user = await User.findOne({email});
        // If a user with the email is found return message to user
        if (user) {
            res.status(400).json({message: 'User already exists'})
        }
        // If user email does not exists create a new user
        user = new User({
            name, email, password
        });
        // Create salt variable for hashing of password
        const salt = await bcrypt.genSalt(10);
        // Set the newly created users password to the hashed password
        user.password = await bcrypt.hash(password, salt);
        // Save the new user to the DB
        await user.save();

        // After user is saved send payload {} for creating json web token
        const sentPayload = {
            user: {
                id: user.id
            }
        };

        // Sign (initialize) jwt token
        jwt.sign(sentPayload, config.get('jwtSecret'), {
            expiresIn: 360000,
        }, (err, token) => err ? console.error(err) : res.json({token}));

        // Catch any errors that come from the server
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error with error: ${err}`)
    }
};
