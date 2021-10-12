'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ObjetTrouve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ObjetTrouve.belongsTo(model.User, {
        foreignKey:{
          allowNull: false,
        }
      })
      // define association here
    }
  };
  ObjetTrouve.init({
    idUser: DataTypes.INTEGER,
    intitule: DataTypes.STRING,
    description: DataTypes.STRING,
    categorie: DataTypes.ENUM,
    status_trouve: DataTypes.BOOLEAN,
    latitude: DataTypes.STRING,
    logitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ObjetTrouve',
  });
  return ObjetTrouve;
};