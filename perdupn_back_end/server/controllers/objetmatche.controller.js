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

const getObjetMatche = async (req, res) => {
    try{
        const objetMatche = await ObjetMatcheModel.findOne({
            where:
            {
                objettrouve_id: req.params.id
            }
        })
        if(objetMatche)
        {
            res.send(objetMatche);
        }
        else
        {
            return res.status(200).json({
                result: 1,
                message: "Aucun match trouvé"
            });
        }
    }
    catch(err)
    {
        return res.status(200).json({
            result: 0,
            message: "Erreur lors de récupération des objets matchés"
        });
    }
}

const deleteObjetMatche = async (req, res) => {
    try {
        await ObjetMatcheModel.destroy({
            where: {
                objettrouve_id: req.params.id
            }
        });
        res.json({
            "message": "Objet Matche Deleted"
        });
    } catch (err) {
        console.log(err);
        res.json({
            message:err
        });
    }
}


module.exports = {createObjetMatche, getObjetMatche, deleteObjetMatche}