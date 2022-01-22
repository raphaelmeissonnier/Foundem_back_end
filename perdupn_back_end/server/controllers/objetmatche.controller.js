const {Sequelize, QueryTypes} = require("sequelize");
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

//CHANGER LE FRONT (BODY + FETCH) + AJOUTER UNE NOUVELLE ROUTE
const updateObjetMatche= async (req, res) => {
    try {

        console.log("PARAMS",req.params)
        const rec_objettrouve = await db.query("SELECT id_objet FROM objet where status_objet='trouvé' AND id_objet=:par_id",
        {
            replacements : {
                par_id: req.params.id,
            },
            type: QueryTypes.SELECT
        });

        console.log("Objet Trouve id", rec_objettrouve[0].id_objet);
        if(rec_objettrouve){
            await db.query("UPDATE objetmatche SET etat=:etat WHERE objet_trouve=:objettrouve",
            {
                replacements : {
                    etat: req.body.etat,
                    objettrouve: rec_objettrouve[0].id_objet
                },
                type: QueryTypes.UPDATE
            });
            res.json({
                message: "Objet Matche Updated"
            });
        }
        
    } catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
}


module.exports = {createObjetMatche, getObjetMatche, updateObjetMatche}