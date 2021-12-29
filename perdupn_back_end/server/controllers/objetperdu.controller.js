const {ObjetPerduModel, UserModel} = require("../models/tables.model");
const LocalisationFloue = require("../services/LocalisationFloue");
const Main = require("../services/Main");
const ObjetPerdu = require("../services/ObjetPerdu")
const Position =require("../services/Position")
const {Sequelize} = require("sequelize");

// Get all Objets Perdus
const getObjetsPerdus = async (req,res) => {
    try {
        const mapObjets = []; //Tableau ou on  stocke les objets Recup de la BD
        let objetsperdus = await ObjetPerduModel.findAll(); // Requete SQL pour recup tous les objets de la BD
        objetsperdus.forEach(objet => mapObjets.push(new ObjetPerdu(objet.id, objet.categorie, new LocalisationFloue(new Position(objet.longitude,objet.latitude),objet.rayon), objet.description, objet.intitule, new Date(objet.date), objet.user_id))) //Transformation des objets BD en type ObjetPerdu
        //console.log("TYPE",typeof(objetsperdus));
        //console.log("Objets Perdus",objetsperdus);
        const monRes = Main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude),parseInt(req.params.rayon),mapObjets); // Appel de la fonction avec les parametre foruni dans la route
        console.log("RES",monRes)
        res.send(monRes);
    }catch(err){
        console.log(err);
    }
}

// Get objet perdu by id
const getObjetPerduById = async (req, res) => {
    try {
        const objetperdu = await ObjetPerduModel.findAll({
            where: {
                user_id:{
                    $not: req.params.id
                }
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
                id: req.body.user_id
            }
        })
        //Si l'user existe, on ajoute l'objet
        if(user)
        {
            await ObjetPerduModel.create({
                intitule: req.body.intitule,
                description: req.body.description,
                categorie: req.body.categorie,
                date: req.body.date,
                longitude: parseFloat(req.body.longitude),
                latitude: parseFloat(req.body.latitude),
                rayon: req.body.rayon,
                user_id: req.body.user_id
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
                id: req.params.id
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
                user_id: req.params.id
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
                id: req.params.id
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