const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('localisation', {
    id_localisation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'localisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_localisation" },
        ]
      },
    ]
  });
};
