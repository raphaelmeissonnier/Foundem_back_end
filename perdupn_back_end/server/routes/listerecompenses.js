// Import express
const express = require("express");
// Import Product Controller
const {
    createListeRecompense,
} = require("../controllers/listerecompense.controller");


// Init express router
const router = express.Router();

router.post('/listeRecompense', createListeRecompense);


module.exports = router;