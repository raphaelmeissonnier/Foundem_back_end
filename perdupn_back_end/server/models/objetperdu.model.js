// import sequelize 
const Sequelize =require("sequelize");
// import connection 
const db = require("../config/database.js");
const User = require("./user.model.js");
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const ObjetPerdu = db.define('objetperdu', {
  // Define attributes
  //idObjet: DataTypes.INTEGER,
  intitule: DataTypes.STRING,
  description: DataTypes.STRING,
  categorie: DataTypes.STRING,
  adresseMail: DataTypes.STRING,
  date: DataTypes.DATE,
  longitude: DataTypes.DOUBLE,
  latitude: DataTypes.DOUBLE,
  rayon: DataTypes.INTEGER
},{
  // Freeze Table Name
  freezeTableName: true,
  createdAt : false,
  updatedAt: false,
  timestamps: false,
});
 
//ObjetPerdu.hasOne(User)

// Export model Product
module.exports = { ObjetPerdu };