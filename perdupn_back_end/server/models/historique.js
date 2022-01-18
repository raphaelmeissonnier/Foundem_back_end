const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historique', {
    id_historique: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_transaction: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_objet_trouve: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'objet',
        key: 'id_objet'
      }
    },
    id_utilisateur_trouveur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
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
        name: "FK_objet",
        using: "BTREE",
        fields: [
          { name: "id_objet_trouve" },
        ]
      },
      {
        name: "FK_utilisateur3",
        using: "BTREE",
        fields: [
          { name: "id_utilisateur_trouveur" },
        ]
      },
    ]
  });
};
