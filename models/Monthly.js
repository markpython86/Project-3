'use strict';
module.exports = (sequelize, DataTypes) => {
  const Monthly = sequelize.define('Monthly', {
    remember: DataTypes.STRING,
    start: DataTypes.STRING,
    stop: DataTypes.STRING,
    monthAt: DataTypes.STRING
  }, {});
  Monthly.associate = function(models) {
    // associations can be defined here
    Monthly.belongsTo(models.User,{
            foreignKey: 'userId'
    })
  };
  return Monthly;
};