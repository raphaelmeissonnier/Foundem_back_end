const {ObjetTrouveModel, UserModel} = require("../models/tables.model");
const LocalisationPrecise = require("../services/LocalisationPrecise");
const Main = require("../services/Main");
const Position = require("../services/Position");
const ObjetTrouve = require("../services/ObjetTrouve")
const {Sequelize} = require("sequelize");

// Get all Objets Trouves
const getObjetsTrouves= async (req,res) => {
    try {
        const mapObjets = []; //Tableau ou on stocke les objets Recup de la BD
        let objetstrouves = await ObjetTrouveModel.findAll(); // Requete SQL pour recup tous les objets de la BD
        objetstrouves.forEach(objet => mapObjets.push(new ObjetTrouve(objet.categorie, new LocalisationPrecise(new Position(objet.longitude,objet.latitude)), objet.description, objet.intitule, new Date(objet.date), objet.adresseMail))) //Transformation des objets BD en type ObjetPerdu
        console.log("TYPE",typeof(objetstrouves));
        console.log("Objets Trouve",objetstrouves);
        const monRes = Main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude),parseInt(req.params.rayon),mapObjets); // Appel de la fonction avec les parametre foruni dans la route
        console.log("RES",monRes)
        res.send(monRes);
    }catch(err){
        console.log(err);
    }
}

// Get objet trouve by id
const getObjetTrouveById = async (req, res) => {
    try {
        const objettrouve = await ObjetTrouveModel.findAll({
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
        //On vérifie que l'user existe
        const user = await UserModel.findOne({
            where:{
                id: req.body.user_id
            }
        })
        //Si l'user existe, on ajoute l'objet
        if(user) {
            await ObjetTrouveModel.create({
                intitule: req.body.intitule,
                description: req.body.description,
                categorie: req.body.categorie,
                date: req.body.date,
                longitude: parseFloat(req.body.longitude),
                latitude: parseFloat(req.body.latitude),
                user_id: req.body.user_id
            });
            res.json({
                "result" : 1,
                "message": "Votre objet a bien été ajouté"
            });
        }
        else {
            res.json({
                "result" : 0,
                "message": "L'utilisateur n'existe pas"
            });
        }
    } catch (err) {
        console.log(err);
        switch (err.constructor)
        {
            case Sequelize.ValidationError:
                res.json({
                    "result": 0,
                    "message": "Paramètres manquants"
                });
                break;
            default:
                res.json({
                    "result": 0,
                    "message": err
                });
                break
        }
    }
}

// Update objet trouve by id
const updateObjetTrouve= async (req, res) => {
    try {
        await ObjetTrouveModel.update(req.body, {
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
        await ObjetTrouveModel.destroy({
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