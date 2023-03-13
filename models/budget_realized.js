'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class budget_realized extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  budget_realized.init({
    date_realized: DataTypes.DATE,
    realized_budget: DataTypes.INTEGER,
    observation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'budget_realized',
  });
  return budget_realized;
};