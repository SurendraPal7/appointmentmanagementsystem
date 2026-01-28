// /controllers/doctorCtrl.js
const { validationResult } = require('express-validator');
// const Doctor = require('../models/Doctor').default;
const User = require('../models/User').default;

exports.listDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({}).populate('user','name phone email').limit(200);
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

exports.createDoctor = async (req, res, next) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

    const { user, specialization, bio, availability, maxAppointmentsPerDay } = req.body;

    const userDoc = await User.findById(user);
    if (!userDoc) return res.status(400).json({ message: 'User not found' });

    const exists = await Doctor.findOne({ user });
    if (exists) return res.status(400).json({ message: 'Doctor already exists' });

    const doc = new Doctor({
      user,
      specialization,
      bio,
      availability,
      maxAppointmentsPerDay
    });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.getDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findById(req.params.id).populate('user','name phone email');
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};
