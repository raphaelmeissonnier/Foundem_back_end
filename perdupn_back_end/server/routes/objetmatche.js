// Import express
const express = require("express");
// Import Product Controller
const {
    createObjetMatche,
    getObjetMatche,
    updateObjetMatche
} = require("../controllers/objetmatche.controller");

// Init express router
const router = express.Router();

router.post('/objetsmatche', createObjetMatche);

router.get('/objetsmatche/:id', getObjetMatche);

router.patch('/objetsmatche/:id', updateObjetMatche);

module.exports = router;