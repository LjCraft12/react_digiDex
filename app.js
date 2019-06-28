const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    users = require('./routes/users'),
    auth = require('./routes/auth'),
    contacts = require('./routes/contacts');

// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);


app.listen(port, err => {
    err ? console.log(`Error while connecting to port ${port}, with error: ${err}`)
        : console.log(`Connected to server port ${port}`)
});
