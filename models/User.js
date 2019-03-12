'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      last: {
      type: DataTypes.STRING,
      allowNull: false,
      }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Daily, {
      onDelete: "cascade"
    });
    User.hasMany(models.Weekly, {
      onDelete: "cascade"
    });
    User.hasMany(models.Monthly, {
      onDelete: "cascade"
    });
  };
  return User;
};