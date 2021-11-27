const ObjetPerdu = require("../models/objetperdu.model");

// Get all Objets Perdus
const getObjetsPerdus = async (req,res) => {
    try {
        const objetsperdus = await ObjetPerdu.findAll();
        res.send(res);
    }catch(err){
        console.log(err);
    }
}

// Get objet perdu by id
const getObjetPerduById = async (req, res) => {
    try {
        const objetperdu = await ObjetPerdu.findAll({
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
        await ObjetPerdu.create(req.body);
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
        await ObjetPerdu.update(req.body, {
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
        await ObjetPerdu.destroy({
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