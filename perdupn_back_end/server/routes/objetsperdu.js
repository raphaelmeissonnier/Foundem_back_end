// Import express
const express = require("express");
// Import Product Controller
const { 
    getObjetPerduById,
    getObjetsPerdus,
    updateObjetPerdu,
    createObjetPerdu,
    deleteObjetPerdu,
    getObjetPerduByIdUser
 } = require("../controllers/objetperdu.controller");

  // Init express router
const router = express.Router();

router.get('/objetsperdus/:longitude/:latitude/:rayon',getObjetsPerdus);

router.get('/objetsperdus/:id',getObjetPerduById);

router.post('/objetsperdus', createObjetPerdu);

router.put('/objetsperdus/:id',updateObjetPerdu);

router.delete('/objetsperdus/:id', deleteObjetPerdu);

router.get('/objetsperdus/user/:id', getObjetPerduByIdUser);

module.exports= router;

