'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ObjetPerdu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ObjetPerdu.belongsTo(model.User, {
        foreignKey:{
          allowNull: false,
        }
      })
      // define association here
    }
  };
  ObjetPerdu.init({
    idUser: DataTypes.INTEGER,
    description: DataTypes.STRING,
    categorie: DataTypes.ENUM,
    status_trouve: DataTypes.BOOLEAN,
    latitude: DataTypes.STRING,
    logitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ObjetPerdu',
  });
  return ObjetPerdu;
};