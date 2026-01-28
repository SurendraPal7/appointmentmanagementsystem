// /routes/patients.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const User = require('../models/User').default;

// Very minimal patient route set for admin use
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password').limit(100);
    res.json(patients);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
