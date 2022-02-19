const db = require('../config/database');
const Sequelize = require('sequelize');
var DataTypes = Sequelize.DataTypes;
var localisation = require("../models/localisation");
var LocalisationModel = localisation(db,DataTypes);


const createLocalisation = async (req, where) => {
    return LocalisationModel.findOrCreate({
        where: {
            $and: where
        },
        defaults: {
            longitude: parseFloat(req.body.longitude),
            latitude: parseFloat(req.body.latitude),
            rayon: req.body.rayon
        },
        attributes: ['id_localisation']
    });
}

module.exports = {createLocalisation};