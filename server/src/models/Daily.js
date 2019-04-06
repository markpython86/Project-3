import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';

  const dailySchema = new mongoose.Schema({
    
    highlights: { type: String },
    positive: { type: String },
    negative: { type: String },
    wakeup: { type: String },
    sleep: { type: String },
    habit1: { type: String },
    habit2: { type: String },
    habit3: { type: String },
    selectedDate: { type: Date },
    user_id:{ type: String },
    year: {type: Number},
    week: {type: Number},
    month: {type: Number},
    weekRange:{ type: String },
    fullDate:{ type: String }
    
  })
// add association later

  const Daily = mongoose.model('Daily', dailySchema);

  module.exports = Daily;
