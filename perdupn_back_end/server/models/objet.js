const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objet', {
    id_objet: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status_objet: {
      type: DataTypes.ENUM('trouvé','perdu'),
      allowNull: false
    },
    intitule: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dates: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorie',
        key: 'id_categorie'
      }
    },
    localisation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'localisation',
        key: 'id_localisation'
      }
    },
    utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    tableName: 'objet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_objet" },
        ]
      },
      {
        name: "FK_categorie",
        using: "BTREE",
        fields: [
          { name: "categorie" },
        ]
      },
      {
        name: "FK_localisation",
        using: "BTREE",
        fields: [
          { name: "localisation" },
        ]
      },
      {
        name: "FK_utilisateur2",
        using: "BTREE",
        fields: [
          { name: "utilisateur" },
        ]
      },
    ]
  });
};
