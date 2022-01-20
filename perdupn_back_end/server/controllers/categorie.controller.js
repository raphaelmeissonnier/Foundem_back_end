const db = require('../config/database');
const Sequelize = require('sequelize');
var DataTypes = Sequelize.DataTypes;
var categorie = require("../models/categorie");
var CategorieModel = categorie(db,DataTypes);


const getCategorie = (req) => {
    const categorie = CategorieModel.findOne({
        where:{
            intitule: req.body.categorie
        },
        attributes:['id_categorie']
    });
    return categorie;
}

module.exports = {getCategorie};