'use strict';
module.exports = (sequelize, DataTypes) => {
  const Daily = sequelize.define('Daily', {
    highlights: DataTypes.STRING,
    positive: DataTypes.STRING,
    negative: DataTypes.STRING,
    wakeup: DataTypes.STRING,
    sleep: DataTypes.STRING

  }, {});
  Daily.associate = function(models) {
    // associations can be defined here
    Daily.belongsTo(models.User,{
      foreignKey: 'userId'
    })
  };
  return Daily;
};