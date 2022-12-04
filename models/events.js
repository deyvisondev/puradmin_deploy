'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      events.belongsTo(models.Product)
      events.belongsTo(models.users)
      events.belongsTo(models.sections)
      events.belongsTo(models.client)
      events.belongsTo(models.event_issue)
      // define association here
    }
  }
  events.init({
    client_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    event_issue_id: DataTypes.INTEGER,
    observation: DataTypes.TEXT,
    date: DataTypes.DATE,
    reposition: DataTypes.ENUM('1', '0'),
    section_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};