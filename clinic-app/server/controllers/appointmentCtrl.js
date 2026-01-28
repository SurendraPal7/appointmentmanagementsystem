// /controllers/appointmentCtrl.js
const { validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const User = require('../models/User').default;

exports.bookAppointment = async (req, res, next) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

    const { doctor, date, time, notes } = req.body;
    // basic validation: ensure doctor exists and role correct
    const docUser = await User.findById(doctor);
    if (!docUser || docUser.role !== 'doctor') return res.status(400).json({ message: 'Invalid doctor' });

    // Prevent double-booking the same slot (status not cancelled)
    const exists = await Appointment.findOne({ doctor, date, time, status: { $ne: 'cancelled' } });
    if (exists) return res.status(400).json({ message: 'Slot not available' });

    const appt = new Appointment({
      patient: req.user._id,
      doctor,
      date,
      time,
      notes
    });
    await appt.save();

    // Future: push job to queue to send SMS/email
    res.status(201).json(appt);
  } catch (err) {
    next(err);
  }
};

exports.listPatientAppointments = async (req, res, next) => {
  try {
    const appts = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name email phone')
      .sort({ date: 1, time: 1 })
      .limit(200);
    res.json(appts);
  } catch (err) {
    next(err);
  }
};

exports.listDoctorAppointments = async (req, res, next) => {
  try {
    const appts = await Appointment.find({ doctor: req.user._id })
      .populate('patient', 'name phone email')
      .sort({ date: 1, time: 1 })
      .limit(500);
    res.json(appts);
  } catch (err) {
    next(err);
  }
};

exports.listAllAppointments = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Appointment.find({})
        .populate('doctor', 'name')
        .populate('patient', 'name')
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit)),
      Appointment.countDocuments()
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate('patient','name phone email')
      .populate('doctor','name');
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    // TODO: notify patient
    res.json(appt);
  } catch (err) {
    next(err);
  }
};

exports.cancelAppointment = async (req, res, next) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    if (String(appt.patient) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
    appt.status = 'cancelled';
    await appt.save();
    res.json({ message: 'Cancelled', appt });
  } catch (err) {
    next(err);
  }
};
