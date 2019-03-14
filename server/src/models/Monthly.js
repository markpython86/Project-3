import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';


  const monthlySchema = new mongoose.Schema({
    remember: { type: String },
    start: { type: String },
    stop: { type: String },
    monthAt: { type: String }
  })
// add association later


  export default mongoose.model('Monthly', monthlySchema);


// module.exports = (sequelize, DataTypes) => {
//   const Monthly = sequelize.define('Monthly', {
//     remember: DataTypes.STRING,
//     start: DataTypes.STRING,
//     stop: DataTypes.STRING,
//     monthAt: DataTypes.STRING
//   }, {});
//   Monthly.associate = function(models) {
//     // associations can be defined here
//     Monthly.belongsTo(models.User,{
//             foreignKey: 'userId'
//     })
//   };
//   return Monthly;
// };