const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historique', {
    id_historique: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_utilisateur_trouveur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    liste_recompense: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'listerecompenses',
        key: 'id'
      }
    },
    rdv: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rendezvous',
        key: 'id_rdv'
      }
    }
  }, {
    sequelize,
    tableName: 'historique',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_historique" },
        ]
      },
      {
        name: "FK_utilisateur3",
        using: "BTREE",
        fields: [
          { name: "id_utilisateur_trouveur" },
        ]
      },
      {
        name: "historique_ibfk_3",
        using: "BTREE",
        fields: [
          { name: "liste_recompense" },
        ]
      },
      {
        name: "historique_ibfk_4",
        using: "BTREE",
        fields: [
          { name: "rdv" },
        ]
      },
    ]
  });
};
