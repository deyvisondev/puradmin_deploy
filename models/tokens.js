'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tokens extends Model {}
    tokens.init({
      token: DataTypes.STRING,
      expire_at: DataTypes.DATE,
      user_id: DataTypes.INTEGER
    }, {
    sequelize,
    modelName: 'tokens',
  });
  return tokens;
};