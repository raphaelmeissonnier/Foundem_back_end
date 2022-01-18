const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('listerecompenses', {
    id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      }
    },
    id_recompense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recompense',
        key: 'id_recompense'
      }
    }
  }, {
    sequelize,
    tableName: 'listerecompenses',
    timestamps: false,
    indexes: [
      {
        name: "FK_utilisateur",
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
      {
        name: "FK_recompense",
        using: "BTREE",
        fields: [
          { name: "id_recompense" },
        ]
      },
    ]
  });
};
