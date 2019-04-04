import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

const weeklySchema = new mongoose.Schema({
  weekID: { type: Object },
  best: { type: String },
  worst: { type: String },
  nextWeek: { type: String },
  weekAt: { type: String },
  year: {type: Number},
  week: {type: Number},
  habits: {type: Array},
  user_id: {type: String }
})
// add association later

const Weekly = mongoose.model('Weekly', weeklySchema);



module.exports = Weekly;


