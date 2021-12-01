// import sequelize 
const Sequelize = require("sequelize");
// import connection 
const db = require("../config/database.js");
const ObjetPerdu = require("./objetperdu.model.js");
const ObjetTrouve = require("./objettrouve.model.js");
 
// init DataTypes
const { DataTypes } = Sequelize;

class User extends Sequelize.Model {
  getUsername() { return this.username; }
  getEmail() { return this.email; }
}
 
// Define schema
User.init({
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
    localisation: DataTypes.INTEGER
},{
  // Freeze Table Name
  freezeTableName: true,
  createdAt : false,
  updatedAt: false,
  timestamps: false,
  db,
  modelName: 'User'
});

//User.hasMany(ObjetPerdu)
//User.hasMany(ObjetTrouve)


// Export model Product
module.exports =User;