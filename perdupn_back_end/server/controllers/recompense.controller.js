const {Sequelize} = require('sequelize');
const db = require('../config/database');
var DataTypes = Sequelize.DataTypes;
var recompenseController = require("../models/recompense");
var RecompenseModel = recompenseController(db,DataTypes);

const getRecompenseById = async (req) =>{
    return RecompenseModel.findOne({
            where:{
                id_recompense: req.body.recompense_id
            }
        });
}

module.exports = {getRecompenseById};
