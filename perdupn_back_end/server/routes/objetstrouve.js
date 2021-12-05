// Import express
const express = require("express");
// Import Product Controller
const { 
    getObjetTrouveById,
    getObjetsTrouves,
    updateObjetTrouve,
    createObjetTrouve,
    deleteObjetTrouve,
    rechercheObjetTrouve
 } = require("../controllers/objettrouve.controller");

  // Init express router
const router = express.Router();

router.get('/objetstrouves/:longitude/:latitude/:rayon',getObjetsTrouves);

router.get('/objetstrouves/:id',getObjetTrouveById);

router.post('/objetstrouves', createObjetTrouve);

router.post('/objetstrouves/recherche', rechercheObjetTrouve)

router.put('/objetstrouves/:id',updateObjetTrouve);

router.delete('/objetstrouves/:id', deleteObjetTrouve);

module.exports = router;