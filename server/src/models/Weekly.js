import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

const weeklySchema = new mongoose.Schema({
  best: DataTypes.STRING,
  worst: DataTypes.STRING,
  next: DataTypes.STRING,
  weekAt: DataTypes.DATE
})
// add association later

export default mongoose.model('Weekly', weeklySchema);









// const Weekly = sequelize.define('Weekly', {
  //   best: DataTypes.STRING,
  //   worst: DataTypes.STRING,
  //   next: DataTypes.STRING,
  //   weekAt: DataTypes.DATE
  // }, {});
  // Weekly.associate = function(models) {
  //   // associations can be defined here
  //   Weekly.belongsTo(models.User, {
  //           foreignKey: 'userId'
  //   })
  // };

