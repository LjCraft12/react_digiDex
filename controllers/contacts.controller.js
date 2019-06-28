/*
*  @route  GET api/contacts
*  @desc   Get user contacts
*  @access Private
* */
exports.getUserContacts = (req, res) => {
    res.send('getting user contacts')
};

/*
*  @route  POST api/contacts
*  @desc   Add contact to user
*  @access Private
* */
exports.postAddNewContact = (req, res) => {
    res.send('Adding contacts')
};
/*
*  @route  PUT api/contacts/:id
*  @desc   Edit user contact
*  @access Private
* */
exports.updateUserContact = (req, res) => {
    res.send('Updated contact')
};

/*
*  @route  DELETE api/contacts/:id
*  @desc   Delete contact from user
*  @access Private
* */
exports.deleteUserContact = (req, res) => {
    res.send('Contact deleted')
};
