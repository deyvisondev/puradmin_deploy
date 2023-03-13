'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class budget_expected extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  budget_expected.init({
    date_expected: DataTypes.DATE,
    expected_budget: DataTypes.STRING,
    observation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'budget_expected',
  });
  return budget_expected;
};