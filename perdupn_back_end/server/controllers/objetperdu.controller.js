const LocalisationFloue = require("../services/LocalisationFloue");
const Main = require("../services/Main");
const ObjetPerdu = require("../services/ObjetPerdu")
const Position =require("../services/Position")
const {Sequelize} = require("sequelize");

const db = require('../config/database');
var DataTypes = Sequelize.DataTypes;
var utilisateur = require("../models/utilisateur");
var UserModel = utilisateur(db,DataTypes);
var objet = require("../models/objet");
var ObjetPerduModel = objet(db,DataTypes);
var categorie = require("../models/categorie");
var CategorieModel = categorie(db,DataTypes);
var localisation = require("../models/localisation");
var LocalisationModel = localisation(db,DataTypes);

const { createLocalisation } = require("../controllers/localisation.controller");
const { getCategorie } = require("../controllers/categorie.controller");


// Get all Objets Perdus
const getObjetsPerdus = async (req,res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        let objetsperdus = await ObjetPerduModel.findAll({
            where:{
                id_objet: "perdu"
            }
        }); // Requete SQL pour recup tous les objets de la BD
        objetsperdus.forEach(objet => mapObjets.push(new ObjetPerdu(objet.id_objet, objet.categorie.intitule, new LocalisationFloue(new Position(objet.localisation.longitude,objet.localisation.latitude),objet.localisation.rayon), objet.description, objet.intitule, new Date(objet.dates), objet.utilisateur))) //Transformation des objets BD en type ObjetPerdu
        const monRes = Main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude),parseInt(req.params.rayon),mapObjets); // Appel de la fonction avec les parametre foruni dans la route
        console.log("RES",monRes)
        res.send(monRes);
    }catch(err){
        console.log(err);
    }
}

// Get objet perdu by id
//PARCOURIR LA LISTE DES ObjetsMatche
const getObjetPerduById = async (req, res) => {
    try {
        const objetperdu = await ObjetPerduModel.findAll({
            where: {
                utilisateur:{
                    $not: req.params.id
                },
                etat:1
            }
        });
        res.send(objetperdu);
    } catch (err) {
        console.log(err);
    }
}


// Create a new objet perdu
const createObjetPerdu = async (req, res) => {
    try {
        //On vérifie que l'user existe
        const user = await UserModel.findOne({
            where:{
                id_utilisateur: req.body.user_id
            }
        })
        //Si l'user existe, on ajoute l'objet
        //RECUPERER L'ID DE LA CATEGORIE
        const cate = getCategorie(req);
        //CREATION D'UNE NOUEVLLE LOCALISATION
        const loca = createLocalisation(req);
        if(user)
        {
            await ObjetPerduModel.create({
                intitule: req.body.intitule,
                description: req.body.description,
                categorie: cate,
                dates: req.body.date,
                localisation: loca,
                utilisateur: req.body.user_id,
                status_objet: "perdu"
            });
            res.json({
                "result": 1,
                "message": "Votre objet a bien été ajouté"
            });
        }
        else
        {
            res.json({
                "result": 0,
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
                break;
        }
    }
}


// Update objet perdu by id
//CETTE METHODE EST INITUE ON DOIT LA RETROUVER DANS objetmatche.controller + PATCH SUR LA ROUTE
const updateObjetPerdu= async (req, res) => {
    try {
        await ObjetPerduModel.update(
            {etat: req.body.etat},
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.json({
            message: "Objet Perdu Updated"
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
}
 
// Delete objet perdu by id
const deleteObjetPerdu = async (req, res) => {
    try {
        await ObjetPerduModel.destroy({
            where: {
                id_objet: req.params.id
            }
        });
        res.json({
            "message": "Objet Perdu Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

// Get objet perdu by user id
const getObjetPerduByIdUser = async (req, res) => {
    try {
        const objetperdu = await ObjetPerduModel.findAll({
            where: {
                utilisateur: req.params.id
            }
        });
        res.send(objetperdu);
    } catch (err) {
        console.log(err);
    }
}

const getObjetPerduByIdObjet = async (req, res) => {
    try{
        const objetPerdu = await ObjetPerduModel.findOne({
            where:
            {
                id_objet: req.params.id
            }
        })
        if(objetPerdu)
        {
            res.send(objetPerdu);
        }
        else
        {
            res.json({
                result: 0,
                message: "Aucun objet trouvé"
            })
        }
    }
    catch(err){
        res.json({
            result : 0,
            message: err
        })
    }
}

module.exports = {deleteObjetPerdu,createObjetPerdu,updateObjetPerdu,getObjetPerduById,getObjetsPerdus, getObjetPerduByIdUser, getObjetPerduByIdObjet}