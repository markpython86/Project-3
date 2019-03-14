import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';


  const monthlySchema = new mongoose.Schema({
    remember: { type: String },
    start: { type: String },
    stop: { type: String },
    monthAt: { type: String }
  })
// add association later


const Monthly = mongoose.model('Monthly', monthlySchema);

module.exports = Monthly;
