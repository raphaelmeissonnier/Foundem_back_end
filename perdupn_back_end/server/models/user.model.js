// import sequelize 
const Sequelize = require("sequelize");
// import connection 
const db = require("../config/database.js");
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const User = db.define('user', {
    // Define attributes
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,


},{
  // Freeze Table Name
  freezeTableName: true,
  createdAt : false,
  updatedAt: false,
  timestamps: false,
});
 
// Export model Product
module.exports =User;

