const jwt = require('jsonwebtoken'),
    config = require('config');

module.exports = async (req, res, next) => {
  // Get token from the requesting hearer
    const token = req.header('x-auth-token');

    // Check for token
    if(!token) {
        return res.status(401).json( {message: 'Access denied you are not logged in' });
    }
    try {
    // Verify token and decode it
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));

        req.user = decodedToken.user;
        next();
    } catch(err) {
        res.status(401).json({ message: 'Invalid token try logging in again'});
    }
};
