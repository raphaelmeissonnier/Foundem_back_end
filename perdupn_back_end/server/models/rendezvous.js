const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rendezvous', {
    id_rdv: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_rdv: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    etat: {
      type: DataTypes.ENUM('refuse','en cours','valide'),
      allowNull: false
    },
    localisation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'localisation',
        key: 'id_localisation'
      }
    },
    first_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    second_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    }
  }, {
    sequelize,
    tableName: 'rendezvous',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_rdv" },
        ]
      },
      {
        name: "FK_localisation2",
        using: "BTREE",
        fields: [
          { name: "localisation" },
        ]
      },
      {
        name: "FK_first_user",
        using: "BTREE",
        fields: [
          { name: "first_user" },
        ]
      },
      {
        name: "FK_second_user",
        using: "BTREE",
        fields: [
          { name: "second_user" },
        ]
      },
    ]
  });
};
