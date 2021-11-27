const ObjetTrouve = require("../models/objettrouve.model");

// Get all Objets Trouves
const getObjetsTrouves= async (req,res) => {
    try {
        const objetstrouves = await ObjetTrouve.findAll();
        res.send(objetstrouves);
    }catch(err){
        console.log(err);
    }
}

// Get objet trouve by id
const getObjetTrouveById = async (req, res) => {
    try {
        const objettrouve = await ObjetTrouve.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(objettrouve[0]);
    } catch (err) {
        console.log(err);
    }
}

// Create a new objet trouve
const createObjetTrouve = async (req, res) => {
    try {
        await ObjetTrouve.create(req.body);
        res.json({
            "message": "Objet Trouve Created"
        });
    } catch (err) {
        console.log(err);
    }
}

// Update objet trouve by id
const updateObjetTrouve= async (req, res) => {
    try {
        await ObjetTrouve.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Objet Trouve Updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 
// Delete objet trouve by id
const deleteObjetTrouve = async (req, res) => {
    try {
        await ObjetTrouve.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Objet Trouve Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getObjetTrouveById,getObjetsTrouves,deleteObjetTrouve,updateObjetTrouve,createObjetTrouve}