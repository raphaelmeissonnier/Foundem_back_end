const ListeRecompense = require('../services/ListeRecompense');

const {Sequelize} = require('sequelize');
const db = require('../config/database');
var DataTypes = Sequelize.DataTypes;
var listerecompense = require("../models/listerecompenses");
var ListeRecompenseModel = listerecompense(db,DataTypes);

const {getRecompenseById} = require("./recompense.controller");
const {getUserById, updateSoldeUser} = require("./user.controller");

//Vérifier que le solde de l'utilisateur est suffisant
const createListeRecompense = async (req, res) =>{
    try {
        //On récupère la valeur de la récompense demandée par l'utilisateur
        const recompense = await getRecompenseById(req);

        //On récupère le solde de l'utilisateur
        const user = await getUserById(req, res);

        //Création d'un objet de type ListeRecompense
        const listeRecompenseobjet = new ListeRecompense(req.body.id, req.body.recompense_id,req.body.date);
        if(listeRecompenseobjet.verifier(user.solde, recompense.valeur))
        {
            //RESPECTER LES CHAMPS DU BODY => LIAISON AVEC D'AUTRES CONTROLLERS
            const listeRecompense = await ListeRecompenseModel.create({
                id_utilisateur: req.body.id,
                id_recompense: req.body.recompense_id,
                date_recompense: req.body.date
            });
            //RECALCUL DU SOLDE
            newSolde = listeRecompenseobjet.soustraire(user.solde, recompense.valeur);
            console.log("newSolde", newSolde);
            //UPDATE L'UTILISATEUR
            const updateUser = await updateSoldeUser(req, newSolde);

            //FAIRE UNE INSERTION DANS LA TABLE HISTORIQUE FAIRE LA MEME CHOSE QUAND LE RDV EST ACCEPTE
            res.json({
                "result": 1,
                "message": "Vous avez débloqué une récompense !"
            })
        }
        else
        {
            res.json({
                "result": 0,
                "message": "Votre solde de points est insuffisant pour débloquer cette récompense !"
            });
        }
    }catch (e)
    {
        res.json({
            "result": 0,
            "message": e
        })
    }
}

module.exports = {createListeRecompense};