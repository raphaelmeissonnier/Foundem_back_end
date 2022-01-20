const {Sequelize} = require("sequelize");
const db = require('../config/database');
var DataTypes = Sequelize.DataTypes;
var objetmatche = require("../models/objetmatche");
var ObjetMatcheModel = objetmatche(db,DataTypes);
var objet = require("../models/objet");
var ObjetPerduModel = objet(db,DataTypes);
var ObjetTrouveModel = objet(db,DataTypes);


// Create a new objet trouve
const createObjetMatche = async (req, res) => {
    try {
        await ObjetMatcheModel.create({
            objet_trouve: req.body.idObjetT,
            objet_perdu: req.body.idObjetP,
            etat : "en cours"
        });
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
                objet_trouve: req.params.id
            }
        });
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
                objet_trouve: req.params.id
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

//CHANGER LE FRONT (BODY + FETCH) + AJOUTER UNE NOUVELLE ROUTE
const updateObjetMatche= async (req, res) => {
    try {
        await ObjetMatcheModel.update(
            {etat: req.body.etat},
            {
                where: {
                    objet_trouve: req.params.id
                }
            }
        );
        res.json({
            message: "Objet Matche Updated"
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
}


module.exports = {createObjetMatche, getObjetMatche, deleteObjetMatche, updateObjetMatche}