const {ObjetMatche} = require("../models/tables.model");


// Create a new objet trouve
const createObjetMatche = async (req, res) => {
    try {
        await ObjetMatche.create({
            objettrouve_id: req.body.objettrouve,
            objetperdu_id: req.body.objetperdu,
        });
        res.json({
            "message": "Objet Matche Created"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {createObjetMatche}