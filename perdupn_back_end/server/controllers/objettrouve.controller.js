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
const fs = require('fs')
const cheminImg = '../../Foundem_front_end/front-end/public/'

const { createLocalisation } = require("../controllers/localisation.controller");
const { getCategorie } = require("../controllers/categorie.controller");
const {body} = require("express-validator");

// Get all Objets Trouves
const getObjetsTrouves= async (req,res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        // Requete SQL pour recup tous les objets de la BD
        const objetstrouves = await db.query("SELECT * FROM objet as ob, localisation as loca, categorie as cate WHERE ob.localisation=loca.id_localisation AND ob.categorie=cate.id_categorie AND ob.status_objet= :status_objet AND id_objet NOT IN (SELECT objet_trouve FROM objetmatche)",
            {
                replacements : {
                    status_objet: "trouvé"
                },
                type: QueryTypes.SELECT
            });
        objetstrouves.forEach(object => mapObjets.push(new ObjetTrouve(object.id_objet, object.intitule_categorie, new LocalisationPrecise(new Position(object.longitude,object.latitude)), object.description, object.intitule, new Date(object.dates), object.utilisateur))) //Transformation des objets BD en type ObjetPerdu
        //console.log("Objets Trouve",objetstrouves);
        const monRes = Main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude),parseInt(req.params.rayon),mapObjets); // Appel de la fonction avec les parametre foruni dans la route
        console.log("RES",monRes)
        res.send(monRes);
    }catch(err){
        console.log(err);
    }
}

const getObjetTrouveById = async (req, res) => {
    try {
        const objettrouve = await db.query("SELECT distinct * FROM objet, localisation, categorie WHERE localisation=id_localisation AND categorie=id_categorie AND id_objet=:id AND status_objet=:status_objet",
        {
            replacements : {
                id: req.params.id,
                status_objet: "trouve"
            },
            type: QueryTypes.SELECT
        });
        res.send(objettrouve);
        
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
                id_utilisateur: req.body.user_id
            }
        })

        //On recupere l'id du dernier objet crée
        const rq=await db.query('SELECT id_objet FROM objet ORDER BY id_objet DESC LIMIT 1')
        console.log("OBJET ID", rq[0][0].id_objet+1)
        const last_id_objet = rq[0][0].id_objet+1;
        
        //on formate l'image pour la stocker dans un repertoire
        var img = req.body.img.img
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, 'base64');
        fs.writeFile(cheminImg+last_id_objet+"_"+req.body.img.name,buf,function(err) {
            if (err){
                console.log(err)
                throw err;
            } 
        })  

        console.log("\nIMAGE RECU \n",req.body.img)
        //Si l'user existe, on ajoute l'objet
        if(user) {
            const cate = await getCategorie(req);
            const loca = await createLocalisation(req, [{longitude: req.body.longitude}, {latitude: req.body.latitude}, {rayon: null}]);

            await ObjetTrouveModel.create({
                status_objet:"trouvé",
                intitule: req.body.intitule,
                description: req.body.description,
                categorie: cate.id_categorie,
                img: last_id_objet+"_"+req.body.img.name,
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
        if(Sequelize.ValidationError)
        {
            res.json({
                "result": 0,
                "message": "Paramètres manquants"
            });
        }
        else {
            res.json({
                "result": 0,
                "message": err
            });
        }
    }
}

const updateObjetTrouveById = async(req, res) => {
    try {
        await ObjetTrouveModel.update(req.body,{
            where: {
                id_objet: req.params.id,
            },
        });
        res.json({
            result: 1,
            "message": "Objet Trouve by ID Updated"
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
                id_objet: req.params.id,
                status_objet: "trouvé"
            },
        });
        res.json({
            "message": "Objet Trouve Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

// Recherche objet trouve by id
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
            //On récupère l'ensemble des objets trouvés qui n'appartiennent pas à l'utilisateur et qui ne sont pas dans un match
            const objetstrouves = await db.query("SELECT * FROM objet, categorie, localisation WHERE id_categorie=categorie AND id_localisation=localisation AND utilisateur!= :id_user AND status_objet= :status_objet AND id_objet NOT IN (SELECT objet_trouve FROM objetmatche)",
                {
                    replacements : {
                        id_user: req.body.user_id,
                        status_objet: "trouvé"
                    },
                    type: QueryTypes.SELECT
                });
            console.log("let objetstrouves", objetstrouves);

            //Si il existe dans la base de données des objets trouvés alors on lance la recherche
            if(objetstrouves.length) {
                //console.log("Objet trouves",objetstrouves)
                objetstrouves.forEach(object => mapObjets.push(new ObjetTrouve(object.id_objet, object.intitule_categorie, new LocalisationPrecise(new Position(object.longitude, object.latitude)), object.description, object.intitule, new Date(object.dates), object.utilisateur))) //Transformation des objets BD en type ObjetPerdu
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
        const objettrouve = await db.query("SELECT * FROM objet, localisation, categorie WHERE categorie=id_categorie AND localisation=id_localisation AND status_objet= :status_objet AND utilisateur= :utilisateur AND id_objet NOT IN (select objet_trouve FROM objetmatche)",
            {
                replacements : {
                    status_objet:"trouve",
                    utilisateur: req.params.id
                },
                type: QueryTypes.SELECT
            });
        res.send(objettrouve);
    } catch (err) {
        console.log(err);
    }
}


module.exports = {getObjetsTrouves, getObjetTrouveById, updateObjetTrouveById, deleteObjetTrouve,createObjetTrouve, rechercheObjetTrouve, getObjetTrouveByIdUser}