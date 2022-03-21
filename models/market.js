'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Market.init({
    ticker: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    movement: DataTypes.STRING,
    change: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Market',
  });
  return Market;
};