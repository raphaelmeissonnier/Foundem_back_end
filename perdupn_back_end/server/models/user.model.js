// import sequelize 
const Sequelize = require("sequelize");
// import connection 
const db = require("../config/database.js");
 
// init DataTypes
const { DataTypes } = Sequelize;

const {ObjetPerdu} = require("./objetperdu.model");

/*const ObjetPerdu = db.define('objetperdu', {
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
});*/

// Define schema
const User = db.define('user', {
    // Define attributes
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING,
    objetPerdu_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'objetperdu', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    }
},{
  // Freeze Table Name
  freezeTableName: true,
  createdAt : false,
  updatedAt: false,
  timestamps: false,
});

/*User.hasMany(ObjetPerdu, {
    foreignKey: 'objetPerdu_id',
});
    //constraints: false*/

User.hasMany(ObjetPerdu);

/*User.hasMany(Templates, {
    as: 'templates',
    foreignKey: 'SiteId'
});*/

// Export model User
module.exports =User;

