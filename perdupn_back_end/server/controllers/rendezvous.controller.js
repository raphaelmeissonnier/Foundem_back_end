const {Sequelize, QueryTypes} = require("sequelize");
const db = require('../config/database');
var DataTypes = Sequelize.DataTypes;
var rendezvous = require("../models/rendezvous");
var RendezVousModel = rendezvous(db,DataTypes);
const { createLocalisation } = require("../controllers/localisation.controller");


// Create a new Rendez Vous between 2 users
const createRdv = async (req, res) => {
    try {

        const loca = await createLocalisation(req,[{longitude: req.body.longitude}, {latitude: req.body.latitude}, {rayon: null}])

        await RendezVousModel.create({
            date_rdv: req.body.date_rdv,
            etat : "en cours",
            localisation: loca[0].id_localisation,
            first_user: req.body.user_perdu,
            second_user: req.body.user_trouve,
            objet_matche: req.body.objet_matche
        });
        res.status(200).json({
            result: 1,
            msg: 'Rendez Vous bien crée !'
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            result: 0,
            msg: "Erreur lors de la creation du Rendez Vous !"
        });
    }
}

// Update Rendez Vous between 2 users (Change the date and localisation)
const updateRdv = async (req, res) => {
    try {

        const loca = await createLocalisation(req,[{longitude: req.body.longitude}, {latitude: req.body.latitude}, {rayon: null}])

        await db.query("UPDATE rendezvous SET date_rdv=:date_rdv, localisation=:loca_rdv, etat= :etat WHERE id_rdv=:id_rdv",
        {
            replacements : {
                date_rdv: req.body.date,
                loca_rdv: loca[0].id_localisation,
                id_rdv: req.params.idrdv,
                etat: req.body.etat
            },
            type: QueryTypes.UPDATE
        });
        res.status(200).json({
            result: 1,
            msg: 'Rendez Vous bien modifié !'
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            result: 0,
            msg: "Erreur lors de la modification du Rendez Vous !"
        });
    }
}

module.exports = {createRdv,updateRdv}