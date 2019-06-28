const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    users = require('./routes/users'),
    auth = require('./routes/auth'),
    contacts = require('./routes/contacts'),
    connectDB = require('./config/db'),
    environment = app.get('env');

// Connect to DB
connectDB();

// Init middleware
app.use(express.json({extended: false}));

// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

// Create server
app.listen(port, err => {
    err ? console.log(`Error while connecting to port ${port}, with error: ${err}`)
        : console.log(`Connected to server port ${port} in the ${environment} environment`)
});
