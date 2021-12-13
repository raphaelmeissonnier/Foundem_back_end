const Sequelize = require("sequelize");
// import connection
const db = require("../config/database.js");

// init DataTypes
const { DataTypes } = Sequelize;


const ObjetPerduModel = db.define('objetperdu', {
    // Define attributes
    intitule:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.TEXT,
    categorie: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    rayon: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user', // 'user' refers to table name
            key: 'id', // 'id' refers to column name in user table
        }
    },
},{
    // Freeze Table Name
    freezeTableName: true,
    createdAt : false,
    updatedAt: false,
    timestamps: false,
});

// Define schema
const UserModel = db.define('user', {
    // Define attributes
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING,
},{
    // Freeze Table Name
    freezeTableName: true,
    createdAt : false,
    updatedAt: false,
    timestamps: false,
});

const ObjetTrouveModel = db.define('objettrouve', {
    // Define attributes
    //idObjet: DataTypes.INTEGER,
    intitule: DataTypes.STRING,
    description: DataTypes.TEXT,
    categorie: DataTypes.STRING,
    date: DataTypes.DATE,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user', // 'user' refers to table name
            key: 'id', // 'id' refers to column name in user table
        }
    },
},{
    // Freeze Table Name
    freezeTableName: true,
    createdAt : false,
    updatedAt: false,
    timestamps: false,
});

module.exports = {UserModel, ObjetTrouveModel, ObjetPerduModel};