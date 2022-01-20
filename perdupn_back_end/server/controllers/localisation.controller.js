const db = require('../config/database');
const Sequelize = require('sequelize');
var DataTypes = Sequelize.DataTypes;
var localisation = require("../models/localisation");
var LocalisationModel = localisation(db,DataTypes);


const createLocalisation = async (req) => {
    const localisation = await LocalisationModel.create({
        longitude: parseFloat(req.body.longitude),
        latitude: parseFloat(req.body.latitude),
        rayon: req.body.rayon
    });
    return localisation;
}

module.exports = {createLocalisation};