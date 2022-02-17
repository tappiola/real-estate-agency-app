const ClientRequests = require('../models/clientRequests');

exports.addMessage = async (req, res) => {
    ClientRequests.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phoneNumber
    });

    res.status(201).end();
};