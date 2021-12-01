const ObjetPerduModel = require("../models/objetperdu.model");
const Main = require("../services/Main");
const ObjetPerdu = require("../services/ObjetPerdu")

// Get all Objets Perdus
const getObjetsPerdus = async (req,res) => {
    try {
        const mapObjets = [];
        objetsperdus = await ObjetPerduModel.findAll();
        objetsperdus.forEach(objet => mapObjets.push(new ObjetPerdu(objet.categorie, objet.localisation, objet.description, objet.intitule, objet.date, objet.adresseMail)))
        console.log("TYPE",typeof(objetsperdus));
        console.log("Objets Perdus",objetsperdus);
        const monRes = Main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude),parseInt(req.params.rayon),mapObjets);
        console.log("RES",monRes)
        res.send(res);
    }catch(err){
        console.log(err);
    }
}

// Get objet perdu by id
const getObjetPerduById = async (req, res) => {
    try {
        const objetperdu = await ObjetPerduModel.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(objetperdu[0]);
    } catch (err) {
        console.log(err);
    }
}

// Create a new objet perdu
const createObjetPerdu = async (req, res) => {
    try {
        await ObjetPerduModel.create(req.body);
        res.json({
            "message": "Objet Perdu Created"
        });
    } catch (err) {
        console.log(err);
    }
}

// Update objet perdu by id
const updateObjetPerdu= async (req, res) => {
    try {
        await ObjetPerduModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Objet Perdu Updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 
// Delete objet perdu by id
const deleteObjetPerdu = async (req, res) => {
    try {
        await ObjetPerduModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Objet Perdu Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {deleteObjetPerdu,createObjetPerdu,updateObjetPerdu,getObjetPerduById,getObjetsPerdus}