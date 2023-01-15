'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Picagens.belongsTo(models.users)
    }
  }
  Picagens.init({
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    qt_picagem: DataTypes.INTEGER,
    observacoes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Picagens',
  });
  return Picagens;
};