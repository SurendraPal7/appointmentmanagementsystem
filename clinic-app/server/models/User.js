// /models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true, unique: true, sparse: true },
  password: { type: String },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  meta: { type: mongoose.Schema.Types.Mixed }, // free-form for extra data e.g. specialization, timings
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.index({ phone: 1 });

module.exports = mongoose.model('User', UserSchema);
