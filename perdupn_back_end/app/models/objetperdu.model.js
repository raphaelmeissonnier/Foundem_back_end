// import sequelize 
const Sequelize =require("sequelize");
// import connection 
const db = require("../config/database.js");
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const ObjetPerdu = db.define('objetperdu', {
  // Define attributes
  idObjet: DataTypes.INTEGER,
  intitule: DataTypes.STRING,
  description: DataTypes.STRING,
  categorie: DataTypes.STRING,
  status_trouve: DataTypes.BOOLEAN,
  latitude: DataTypes.STRING,
  longitude: DataTypes.STRING,
  idUser: DataTypes.INTEGER
},{
  // Freeze Table Name
  freezeTableName: true
});
 
// Export model Product
module.exports= ObjetPerdu;