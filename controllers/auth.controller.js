const {validationResult} = require('express-validator'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/User');

exports.getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude sending back the user password when getting the logged in user
        res.status(200).json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/*
*  @route  POST api/auth
*  @desc   Auth user and login
*  @access Public
* */
exports.postLoginUSer = async (req, res) => {
    // Check for any errors passed in to the errors array routes/auth.js
    const errors = validationResult(req);
    // If any errors are found return the errors array
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        // If user is found and email and password match create payload to send for json web token
        const sentPayload = {
            user: {
                id: user.id
            }
        };

        // Sign (initialize) jwt token
        jwt.sign(sentPayload, config.get('jwtSecret'), {
            expiresIn: 360000,
        }, (err, token) => err ? console.error(err) : res.json({token}));
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server error please try again later'});
    }

};
