import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

  const dailySchema = new mongoose.Schema({
    highlights: { type: String },
    positive: { type: String },
    negative: { type: String },
    wakeup: { type: String },
    sleep: { type: String }
  })
// add association later

  const Daily = mongoose.model('Daily', dailySchema);

  module.exports = Daily;
