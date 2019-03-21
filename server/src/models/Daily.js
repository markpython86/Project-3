import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

  const dailySchema = new mongoose.Schema({
    
    highlights: { type: String },
    positive: { type: String },
    negative: { type: String },
    wakeup: { type: String },
    sleep: { type: String },
  })
// add association later

  const Daily = mongoose.model('Daily', dailySchema);

  module.exports = Daily;


 


// module.exports = (sequelize, DataTypes) => {
//   const Daily = sequelize.define('Daily', {
//     highlights: DataTypes.STRING,
//     positive: DataTypes.STRING,
//     negative: DataTypes.STRING,
//     wakeup: DataTypes.STRING,
//     sleep: DataTypes.STRING

//   }, {});
//   Daily.associate = function(models) {
//     // associations can be defined here
//     Daily.belongsTo(models.User,{
//       foreignKey: 'userId'
//     })
//   };
//   return Daily;
// };