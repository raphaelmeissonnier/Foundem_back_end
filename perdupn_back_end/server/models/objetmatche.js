const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objetmatche', {
    id_objet_matche: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    objet_trouve: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'objet',
        key: 'id_objet'
      }
    },
    objet_perdu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'objet',
        key: 'id_objet'
      }
    },
    etat: {
      type: DataTypes.ENUM('refuse','en cours','valide'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'objetmatche',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_objet_matche" },
        ]
      },
      {
        name: "FK_objet_trouve",
        using: "BTREE",
        fields: [
          { name: "objet_trouve" },
        ]
      },
      {
        name: "FK_objet_perdu",
        using: "BTREE",
        fields: [
          { name: "objet_perdu" },
        ]
      },
    ]
  });
};
