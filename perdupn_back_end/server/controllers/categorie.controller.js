const db = require('../config/database');
const Sequelize = require('sequelize');
var DataTypes = Sequelize.DataTypes;
var categorie = require("../models/categorie");
var CategorieModel = categorie(db,DataTypes);


const getCategorie = async (req) => {
    const categorie = await CategorieModel.findOne({
        where:{
            intitule_categorie: req.body.categorie
        },
        attributes:['id_categorie']
    });
    return categorie;
}

module.exports = {getCategorie};