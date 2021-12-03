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

router.get('/objetsperdus/:longitude/:latitude/:rayon',getObjetsPerdus);

router.get('/objetsperdus/:id',getObjetPerduById);

router.post('/objetsperdus/:longitude/:latitude/:rayon', createObjetPerdu);

router.put('/objetsperdus/:id',updateObjetPerdu);

router.delete('/objetsperdus/:id', deleteObjetPerdu);

module.exports= router;

