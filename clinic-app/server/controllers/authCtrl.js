// /controllers/authCtrl.js
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User').default;

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });
};

exports.register = async (req, res, next) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

    const { name, phone, password, role = 'patient', email } = req.body;
    if (!phone) return res.status(400).json({ message: 'phone required' });

    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, phone, password, role, email });
    await user.save();

    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role, phone: user.phone } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = user.password ? await user.comparePassword(password) : false;
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, phone: user.phone } });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  // middleware wrapper for routes that call controller directly (used by /auth/me)
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.me = async (req, res, next) => {
  try {
    // protect middleware should attach req.user
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

