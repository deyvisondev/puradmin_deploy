'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daily_billing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  daily_billing.init({
    date_billing: DataTypes.DATE,
    expected_billing: DataTypes.DECIMAL,
    effective_billing: DataTypes.DECIMAL,
    daily_lost: DataTypes.DECIMAL,
    credit_note: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'daily_billing',
  });
  return daily_billing;
};