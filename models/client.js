'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  client.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    responsable: DataTypes.STRING,
    maps: DataTypes.STRING,
    foto: DataTypes.STRING,
    status: DataTypes.ENUM('1', '0')
  }, {
    sequelize,
    modelName: 'client',
  });
  return client;
};