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
    etat:{
        type: Sequelize.INTEGER,
        defaultValue: 1,
    }
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
    intitule: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user', // 'user' refers to table name
            key: 'id', // 'id' refers to column name in user table
        },
        allowNull: false
    },
    etat:{
        type: Sequelize.INTEGER,
        defaultValue: 1,
    }
},{
    // Freeze Table Name
    freezeTableName: true,
    createdAt : false,
    updatedAt: false,
    timestamps: false,
});

const ObjetMatcheModel = db.define('objetmatche', {
    // Define attributes
    objettrouve_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'objettrouve', // 'user' refers to table name
            key: 'id', // 'id' refers to column name in user table
        }
    },
    objetperdu_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'objetperdu', // 'user' refers to table name
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

module.exports = {UserModel, ObjetTrouveModel, ObjetPerduModel, ObjetMatcheModel};