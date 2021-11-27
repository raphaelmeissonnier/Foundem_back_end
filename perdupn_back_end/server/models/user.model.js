// import sequelize 
const Sequelize = require("sequelize");
// import connection 
const db = require("../config/database.js");
const ObjetPerdu = require("./objetperdu.model.js");
const ObjetTrouve = require("./objettrouve.model.js");
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const User = db.define('user', {
    // Define attributes
    idUser: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
},{
  // Freeze Table Name
  freezeTableName: true,
  createdAt : false,
  updatedAt: false,
  timestamps: false
});

//User.hasMany(ObjetPerdu)
//User.hasMany(ObjetTrouve)


// Export model Product
module.exports =User;