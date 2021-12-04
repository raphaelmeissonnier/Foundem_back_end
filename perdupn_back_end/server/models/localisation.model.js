// import sequelize
const Sequelize = require("sequelize");
// import connection
const db = require("../config/database.js");
const ObjetPerdu = require("./objetperdu.model");

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const Localisation = db.define('localisation', {
    // Define attributes
    idLocalisation: DataTypes.INTEGER,
    longitude: DataTypes.NUMBER,
    latitude: DataTypes.NUMBER,
},{
    // Freeze Table Name
    freezeTableName: true
});

Localisation.hasMany(ObjetPerdu);

// Export model Product
module.exports = Localisation;