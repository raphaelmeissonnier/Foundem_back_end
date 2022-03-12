// Import express
const express = require("express");
// Import Product Controller
const { 
    getObjetTrouveById,
    getObjetsTrouves,
    createObjetTrouve,
    updateObjetTrouveById,
    deleteObjetTrouve,
    rechercheObjetTrouve,
    getObjetTrouveByIdUser
 } = require("../controllers/objettrouve.controller");


// Init express router
const router = express.Router();

router.get('/objetstrouves/:longitude/:latitude/:rayon',getObjetsTrouves);

router.get('/objetstrouves/:id',getObjetTrouveById);

router.post('/objetstrouves', createObjetTrouve);

router.post('/objetstrouves/recherche', rechercheObjetTrouve);

router.patch('/objettrouve/:id', updateObjetTrouveById)

router.delete('/objetstrouves/:id', deleteObjetTrouve);

router.get('/objetstrouves/user/:id', getObjetTrouveByIdUser);


module.exports = router;