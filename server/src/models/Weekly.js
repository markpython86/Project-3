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
  user_id: {type: String },
  weekStart:{type: String },
  weekEnd:{type: String },
  month: {type: Number },
})
// add association later

const Weekly = mongoose.model('Weekly', weeklySchema);



module.exports = Weekly;


