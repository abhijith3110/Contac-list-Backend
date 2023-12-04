const ContactService = require("../Services/Services");

//get contact
const getAllContacts = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const searchTerm = `%${req.query.searchTerm || ''}%`;

    ContactService.getContacts(page, limit, searchTerm,(err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error", details: err });
        } else {
            return res.status(200).json(result);
        }
    });
};

//create contact
const createAllContact = (req, res) => {
    const { first_name, last_name, email, phn_number } = req.body;
    const contactData = [first_name, last_name, email, phn_number];

    ContactService.createContact(contactData, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error", details: err });
        } else {
            return res.status(200).json({ message: "Contact is successfully created", data });
        }
    });
};

//delete Contact
const deleteContactData = (req, res) => {
    contactID = req.params.id;
    ContactService.deleteContact(contactID, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error", details: err });
        } else {
            return res.status(200).json({ message: "Contact is successfully deleted", data });
        }
    });
};

//update contact
const updateContactData = (req, res) => {
    const contactID = req.params.id;
    const { first_name, last_name, email, phn_number } = req.body;
    const contactData = [first_name, last_name, email, phn_number];

    ContactService.updateContact(contactID, contactData, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error", details: err });
        } else {
            return res.status(200).json({ message: "Contact is successfully updated", data });
        }
    });
};

//get-one contact
const getOneContactData = (req, res) => {
    const contactID = req.params.id;
    ContactService.getOneContact(contactID, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error", details: err });
        } else {
            if (data.length === 0) {
                return res.status(404).json({ error: "Contact not found" });
            }
            return res.status(200).json(data[0]);
        }
    });
};


module.exports = {
    getAllContacts,
    createAllContact,
    deleteContactData,
    updateContactData,
    getOneContactData,
};
