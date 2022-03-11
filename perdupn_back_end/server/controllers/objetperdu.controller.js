const LocalisationFloue = require("../services/LocalisationFloue");
const Main = require("../services/Main");
const ObjetPerdu = require("../services/ObjetPerdu")
const Position =require("../services/Position")
const {Sequelize, QueryTypes} = require("sequelize");

const db = require('../config/database');
var DataTypes = Sequelize.DataTypes;
var utilisateur = require("../models/utilisateur");
var UserModel = utilisateur(db,DataTypes);
var objet = require("../models/objet");
var ObjetPerduModel = objet(db,DataTypes);
const fs = require('fs')
const cheminImg = '../../Foundem_front_end/front-end/public/'

const { createLocalisation } = require("../controllers/localisation.controller");
const { getCategorie } = require("../controllers/categorie.controller");


// Get all Objets Perdus
const getObjetsPerdus = async (req,res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        const objetsperdus = await db.query("SELECT * FROM objet as ob, localisation as loca, categorie as cate WHERE ob.localisation=loca.id_localisation AND ob.categorie=cate.id_categorie AND ob.status_objet= :status_objet AND id_objet NOT IN(SELECT objet_perdu FROM objetmatche)",
        {
            replacements : {
                status_objet: "perdu"
            },
            type: QueryTypes.SELECT
        });
        console.log("Objet Perdus",objetsperdus)
        objetsperdus.forEach(objet => mapObjets.push(new ObjetPerdu(objet.id_objet, objet.intitule_categorie, new LocalisationFloue(new Position(objet.longitude,objet.latitude),objet.rayon), objet.description, objet.intitule, new Date(objet.dates), objet.utilisateur))) //Transformation des objets BD en type ObjetPerdu
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
        const objetperdu = await db.query("SELECT distinct * FROM objet, localisation, categorie WHERE localisation=id_localisation AND categorie= id_categorie AND utilisateur!= :id AND status_objet= :status_objet AND id_objet NOT IN(SELECT objet_perdu FROM objetmatche)",
        {
            replacements : {
                id: req.params.id,
                status_objet: "perdu"
            },
            type: QueryTypes.SELECT
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

        const rq=await db.query('SELECT id_objet FROM objet ORDER BY id_objet DESC LIMIT 1')
        console.log("OBJET ID", rq[0][0].id_objet+1)
        const last_id_objet = rq[0][0].id_objet+1;
        //Si l'user existe, on ajoute l'objet
        //RECUPERER L'ID DE LA CATEGORIE
        const cate = await getCategorie(req);
        console.log("Categorie",cate)
        //CREATION D'UNE NOUEVLLE LOCALISATION
        const loca = await createLocalisation(req,[{longitude: req.body.longitude}, {latitude: req.body.latitude}, {rayon: req.body.rayon}]);
        console.log("Localisation",loca[0].id_localisation);

        var img = req.body.img.img
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, 'base64');
        fs.writeFile(cheminImg+last_id_objet+"_"+req.body.img.name,buf,function(err) {
            if (err){
                console.log(err)
                throw err;
            } 
        })  

        if(user)
        {
            await ObjetPerduModel.create({
                intitule: req.body.intitule,
                description: req.body.description,
                categorie: cate.id_categorie,
                img: last_id_objet+"_"+req.body.img.name,
                dates: req.body.date,
                localisation: loca[0].id_localisation,
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

        console.log("PARAMS",req.params)
        const rec_objetperdu = await db.query("SELECT id_objet FROM objet where status_objet='perdu' AND id_objet=:par_id",
        {
            replacements : {
                par_id: req.params.id,
            },
            type: QueryTypes.SELECT
        });

        console.log("Objet Perdu id", rec_objetperdu[0].id_objet);
        if(rec_objetperdu){
            await db.query("UPDATE objetmatche SET etat=:etat WHERE objet_perdu=:objetperdu",
            {
                replacements : {
                    etat: req.body.etat,
                    objetperdu: rec_objetperdu[0].id_objet
                },
                type: QueryTypes.UPDATE
            });
            res.json({
                message: "Objet Perdu Updated"
            });
        }
        
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
        const objetperdu = await db.query("SELECT * FROM objet, localisation, categorie WHERE categorie=id_categorie AND localisation=id_localisation AND status_objet= :status_objet AND utilisateur= :utilisateur AND id_objet NOT IN (select objet_perdu FROM objetmatche) ",
            {
                replacements : {
                    status_objet:"perdu",
                    utilisateur: req.params.id
                },
                type: QueryTypes.SELECT
            });
        console.log("objetperdu:", objetperdu);
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
