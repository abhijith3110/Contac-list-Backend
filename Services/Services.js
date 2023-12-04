const Connectdb = require("../Config/dbConnections");

const getContacts = (page, limit, searchTerm, next) => {
    const skip = (page - 1) * limit;
    const q = `SELECT * FROM 
               contact_list_table WHERE 
               first_name LIKE ? 
               OR last_name LIKE ? 
               OR email LIKE ? OR  
               phn_number LIKE ?  
               LIMIT ?, ?`;

    const countQuery = `SELECT COUNT(*) AS total FROM contact_list_table WHERE 
                        first_name LIKE ? 
                        OR last_name LIKE ? 
                        OR email LIKE ? OR  
                        phn_number LIKE ?`;

    Connectdb.query(q, [searchTerm, searchTerm, searchTerm, searchTerm, skip, limit], (err, data) => {
        if (err) {
            next(err, null);
        } else {
            Connectdb.query(countQuery, [searchTerm, searchTerm, searchTerm, searchTerm], (countErr, countData) => {
                if (countErr) {
                    next(countErr, null);
                } else {
                    const total = countData[0].total;
                    const totalPages = Math.ceil(total / limit);
                    next(null, { data,total,totalPages,page });
                }
            });
        }
    });
};


const createContact = (contactData, next) => {
    const q =
        "INSERT INTO contact_list_table (`first_name`, `last_name`, `email`, `phn_number`) VALUES (?)";
    Connectdb.query(q, [contactData], next);
};

const deleteContact = (contactID, next) => {
    const q = "DELETE FROM contact_list_table WHERE id_contact_list = ?";
    Connectdb.query(q, [contactID], next);
};

const updateContact = (contactID, contactData, next) => {
    const q =
        "UPDATE contact_list_table SET `first_name`=?, `last_name`=?, `email`=?, `phn_number`=? WHERE id_contact_list = ?";
    Connectdb.query(q, [...contactData, contactID], next);
};

const getOneContact = (contactID, next) => {
    const q = "SELECT * FROM contact_list_table WHERE id_contact_list = ?";
    Connectdb.query(q, [contactID], next);
};


module.exports = {
    getContacts,
    createContact,
    deleteContact,
    updateContact,
    getOneContact,
};
