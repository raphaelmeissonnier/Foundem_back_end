// Import express
const express = require("express");
// Import Product Controller
const {
    createObjetMatche
} = require("../controllers/objetmatche.controller");

// Init express router
const router = express.Router();

router.post('/objetstrouves', createObjetMatche);

module.exports = router;