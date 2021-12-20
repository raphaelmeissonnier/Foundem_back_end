const {ObjetTrouveModel, UserModel} = require("../models/tables.model");
const LocalisationPrecise = require("../services/LocalisationPrecise");
const Main = require("../services/Main");
const Position = require("../services/Position");
const ObjetTrouve = require("../services/ObjetTrouve");
const IMatcher = require("../services/IMatcher");

// Get all Objets Trouves
const getObjetsTrouves= async (req,res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        let objetstrouves = await ObjetTrouveModel.findAll(); // Requete SQL pour recup tous les objets de la BD
        objetstrouves.forEach(objet => mapObjets.push(new ObjetTrouve(objet.id, objet.categorie, new LocalisationPrecise(new Position(objet.longitude,objet.latitude)), objet.description, objet.intitule, new Date(objet.date), objet.adresseMail))) //Transformation des objets BD en type ObjetPerdu
        //console.log("TYPE",typeof(objetstrouves));
        //console.log("Objets Trouve",objetstrouves);
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
        await ObjetTrouveModel.create({
            intitule: req.body.intitule,
            description: req.body.description,
            categorie: req.body.categorie,
            adresseMail: req.body.adresseMail,
            date: req.body.date,
            longitude: parseFloat(req.body.longitude),
            latitude: parseFloat(req.body.latitude)
        });
        res.json({
            "message": "Objet Trouve Created"
        });
    } catch (err) {
        console.log(err);
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

// Delete objet trouve by id
//ATTENTION A CE QUE LES IF NE BLOQUENT PAS
const rechercheObjetTrouve = async (req, res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        //On vérifie que l'utilisateur existe bien
        const user = await UserModel.findOne({
            where:{
                id: req.body.user_id
            }
        })
        //Si l'utlisateur existe, on lance la recherche d'objets
        if(user) {
            //On récupère l'ensemble des objets trouvés
            let objetstrouves = await ObjetTrouveModel.findAll({
                where: {
                    user_id: {
                        $not: req.body.user_id
                    }
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

module.exports = {getObjetTrouveById,getObjetsTrouves,deleteObjetTrouve,updateObjetTrouve,createObjetTrouve, rechercheObjetTrouve}