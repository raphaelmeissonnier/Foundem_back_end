const {ObjetMatcheModel, ObjetPerduModel, ObjetTrouveModel} = require("../models/tables.model");


// Create a new objet trouve
const createObjetMatche = async (req, res) => {
    try {
        await ObjetMatcheModel.create({
            objettrouve_id: req.body.idObjetT,
            objetperdu_id: req.body.idObjetP,
        });
        await ObjetPerduModel.update(
            {etat : 2},
            { where:{id: req.body.idObjetP} }
        )
        await ObjetTrouveModel.update(
            {etat : 2},
            {where:{
                id: req.body.idObjetT
            }}
        )
        res.status(200).json({
            result: 1,
            msg: 'Matche entre objet bien crée !'
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            result: 0,
            msg: "Erreur lors de la creation du Matche !"
        });
    }
}

module.exports = {createObjetMatche}