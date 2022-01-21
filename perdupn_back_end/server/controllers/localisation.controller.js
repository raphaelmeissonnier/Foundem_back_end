const db = require('../config/database');
const Sequelize = require('sequelize');
var DataTypes = Sequelize.DataTypes;
var localisation = require("../models/localisation");
var LocalisationModel = localisation(db,DataTypes);


const createLocalisation = async (req, where) => {
    const localisation = await LocalisationModel.findOrCreate({
        where: {
            $and: where
        },
        defaults: {
            longitude: parseFloat(req.body.longitude),
            latitude: parseFloat(req.body.latitude),
            rayon: req.body.rayon
        }
    });
    return localisation;
}

module.exports = {createLocalisation};