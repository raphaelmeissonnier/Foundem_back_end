// Import express
const express = require("express");
// Import Product Controller
const {
    createObjetMatche,
    getObjetMatche,
    deleteObjetMatche
} = require("../controllers/objetmatche.controller");

// Init express router
const router = express.Router();

router.post('/objetsmatche', createObjetMatche);

router.get('/objetsmatche/:id', getObjetMatche);

router.delete('/objetsmatche/:id', deleteObjetMatche);

module.exports = router;