const mongoose = require('mongoose'),
    config = require('config'),
    db = config.get('mongoURI');

const connectDB = async () => {
    try {
    // Connecting to the DB
        mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...')
    } catch(err) {
        // Catch and throw errors when attempting to connect to the DB
        console.error(`Error connect to the DB with error ${err.message}`);
        process.exit(1)
    }
};

module.exports = connectDB;
