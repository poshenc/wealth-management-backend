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
      Market.belongsTo(models.User)
      Market.belongsToMany(models.User, {
        through: models.Watchlist, // 透過 Watchlist 表來建立關聯
        foreignKey: 'marketId',  // 對 Watchlist 表設定 FK
        as: 'WatchlistedUsers'  // 幫這個關聯取個名稱
      })
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