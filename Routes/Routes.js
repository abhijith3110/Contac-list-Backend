const express = require("express");
const router = express.Router();
const controller = require('../Controller/Controller');


router.get("/", controller.getAllContacts);
router.post("/", controller.createAllContact);
router.delete("/:id", controller.deleteContactData);
router.put("/:id", controller.updateContactData);
router.get("/:id", controller.getOneContactData);


module.exports = router;
