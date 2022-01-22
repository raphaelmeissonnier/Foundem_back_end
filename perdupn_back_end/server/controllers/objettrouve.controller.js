const LocalisationPrecise = require("../services/LocalisationPrecise");
const Main = require("../services/Main");
const Position = require("../services/Position");
const ObjetTrouve = require("../services/ObjetTrouve");
const IMatcher = require("../services/IMatcher");

const {Sequelize, QueryTypes} = require('sequelize');
const db = require('../config/database');
var DataTypes = Sequelize.DataTypes;
var utilisateur = require("../models/utilisateur");
var UserModel = utilisateur(db,DataTypes);
var objet = require("../models/objet");
var ObjetTrouveModel = objet(db,DataTypes);
var categorie = require("../models/categorie");
var CategorieModel = categorie(db,DataTypes);
var localisation = require("../models/localisation");
var LocalisationModel = localisation(db,DataTypes);

const { createLocalisation } = require("../controllers/localisation.controller");
const { getCategorie } = require("../controllers/categorie.controller");
const {body} = require("express-validator");

// Get all Objets Trouves
const getObjetsTrouves= async (req,res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        const objetstrouves = await db.query("SELECT * FROM objet as ob, localisation as loca, categorie as cate WHERE ob.localisation=loca.id_localisation AND ob.categorie=cate.id_categorie AND ob.status_objet= :status_objet AND id_objet NOT IN (SELECT objet_trouve FROM objetmatche)",
            {
                replacements : {
                    id: req.params.id,
                    status_objet: "trouvé"
                },
                type: QueryTypes.SELECT
            });
        // Requete SQL pour recup tous les objets de la BD
        objetstrouves.forEach(objet => mapObjets.push(new ObjetTrouve(objet.id_objet, objet.intitule_categorie, new LocalisationPrecise(new Position(objet.longitude,objet.latitude)), objet.description, objet.intitule, new Date(objet.dates), objet.utilisateur))) //Transformation des objets BD en type ObjetPerdu
        //console.log("Objets Trouve",objetstrouves);
        const monRes = Main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude),parseInt(req.params.rayon),mapObjets); // Appel de la fonction avec les parametre foruni dans la route
        console.log("RES",monRes)
        res.send(monRes);
    }catch(err){
        console.log(err);
    }
}

// Get objet trouve by id
/*const getObjetTrouveById = async (req, res) => {
    try {
        const objettrouve = await ObjetTrouveModel.findAll({
            where: {
                status_objet : "trouvé",
                id: req.params.id
            }
        });
        res.send(objettrouve[0]);
    } catch (err) {
        console.log(err);
    }
}*/

// Create a new objet trouve
const createObjetTrouve = async (req, res) => {
    try {
        //On vérifie que l'user existe
        const user = await UserModel.findOne({
            where:{
                id_utilisateur: req.body.user_id
            }
        })
        //Si l'user existe, on ajoute l'objet
        if(user) {
            const cate = await getCategorie(req);
            const loca = await createLocalisation(req, [{longitude: req.body.longitude}, {latitude: req.body.latitude}, {rayon: null}]);

            await ObjetTrouveModel.create({
                status_objet:"trouvé",
                intitule: req.body.intitule,
                description: req.body.description,
                categorie: cate.id_categorie,
                dates: req.body.date,
                localisation : loca[0].id_localisation,
                utilisateur: req.body.user_id
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

// Delete objet trouve by id
const deleteObjetTrouve = async (req, res) => {
    try {
        await ObjetTrouveModel.destroy({
            where: {
                id_objet: req.params.id,
                status_objet: "trouvé"
            }
        });
        res.json({
            "message": "Objet Trouve Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

// Recherche objet trouve by id
//On vérifie que l'utilisateur existe bien
//On récupère tous les objets trouvés qui n'appartiennent pas à l'utilisateur et qui ne sont pas dans un match
const rechercheObjetTrouve = async (req, res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        //On vérifie que l'utilisateur existe bien
        const user = await UserModel.findOne({
            where:{
                id_utilisateur: req.body.user_id
            }
        })
        //Si l'utlisateur existe, on lance la recherche d'objets
        if(user) {
            //On récupère l'ensemble des objets trouvés
            let objetstrouves = await ObjetTrouveModel.findAll({
                where: {
                    user_id: {
                        $not: req.body.user_id
                    },
                    etat: 1
                }
            });
            console.log("let objetstrouves", objetstrouves);

            //CE IF NE MARCHE PAS
            //Si il existe dans la base de données des objets trouvés alors on lance la recherche
            if(objetstrouves.length) {
                //console.log("Objet trouves",objetstrouves)
                objetstrouves.forEach(objet => mapObjets.push(new ObjetTrouve(objet.id, objet.categorie, new LocalisationPrecise(new Position(objet.longitude, objet.latitude)), objet.description, objet.intitule, new Date(objet.date), objet.user_id))) //Transformation des objets BD en type ObjetPerdu
                console.log("MapObjets", mapObjets);
                const match = new IMatcher();
                const monRes = match.matching(mapObjets, req.body.intitule, req.body.categorie, req.body.date, req.body.longitude, req.body.latitude);
                console.log("Mon Res", monRes);
                if(monRes.length)
                {
                    res.send(monRes);
                }
                else
                {
                    res.json({
                        "result": 1,
                        "message": "Aucun objet trouvé correspondant à votre recherche"
                    })
                }
            }
            else
            {
                res.json({
                    "result": 0,
                    "message": "La base de données est vide !"
                })
            }
        }
        else
        {
            res.json({
                "result": 0,
                "message": "L'utlisateur n'existe pas !"
            })
        }
    } catch (err) {
        console.log(err);
        res.json({
            "result": 0,
            "message": err
        });
    }
}

// Get objet trouvé by user id
const getObjetTrouveByIdUser = async (req, res) => {
    try {
        const objettrouve = await ObjetTrouveModel.findAll({
            where: {
                utilisateur: req.params.id,
                status_objet : "trouvé"
            }
        });
        res.send(objettrouve);
    } catch (err) {
        console.log(err);
    }
}


module.exports = {/*getObjetTrouveById,*/getObjetsTrouves,deleteObjetTrouve,createObjetTrouve, rechercheObjetTrouve, getObjetTrouveByIdUser}