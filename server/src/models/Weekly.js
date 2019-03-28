import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

const weeklySchema = new mongoose.Schema({
  best: { type: String },
  worst: { type: String },
  nextWeek: { type: String },
  weekAt: { type: Date },
})
// add association later

const Weekly = mongoose.model('Weekly', weeklySchema);

module.exports = Weekly;









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

