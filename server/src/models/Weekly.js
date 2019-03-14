import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

const weeklySchema = new mongoose.Schema({
  best: { type: String },
  worst: { type: String },
  next: { type: String },
  weekAt: { type: Date }
})
// add association later

const Weekly = mongoose.model('Weekly', weeklySchema);

module.exports = Weekly;

