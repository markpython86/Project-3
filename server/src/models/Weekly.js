import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

const weeklySchema = new mongoose.Schema({
  best: { type: String },
  worst: { type: String },
  nextWeek: { type: String },
  weekAt: { type: String },
})
// add association later

const Weekly = mongoose.model('Weekly', weeklySchema);

module.exports = Weekly;


