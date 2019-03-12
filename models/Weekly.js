'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weekly = sequelize.define('Weekly', {
    best: DataTypes.STRING,
    worst: DataTypes.STRING,
    next: DataTypes.STRING,
    weekAt: DataTypes.DATE
  }, {});
  Weekly.associate = function(models) {
    // associations can be defined here
    Weekly.belongsTo(models.User, {
            foreignKey: 'userId'
    })
  };
  return Weekly;
};