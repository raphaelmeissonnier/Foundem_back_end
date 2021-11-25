// Import express
const express = require("express");
// Import Product Controller
const { 
    getObjetPerduById,
    getObjetsPerdus,
    updateObjetPerdu,
    createObjetPerdu,
    deleteObjetPerdu
 } = require("../controllers/objetperdu.controller");

  // Init express router
const router = express.Router();

router.get('/objetsperdus',getObjetsPerdus);

router.get('/objetsperdus/:id',getObjetPerduById);

router.post('/objetsperdus', createObjetPerdu);

router.put('/objetsperdus/:id',updateObjetPerdu);

router.delete('objetsperdus/:id', deleteObjetPerdu);

module.exports= router;

