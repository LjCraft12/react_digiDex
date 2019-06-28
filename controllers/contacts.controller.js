exports.getUserContacts = (req, res) => {
    res.send('getting user contacts')
};

exports.postAddNewContact = (req, res) => {
    res.send('Adding contacts')
};

exports.updateUserContact = (req, res) => {
    res.send('Updated contact')
};

exports.deleteUserContact = (req, res) => {
    res.send('Contact deleted')
};
