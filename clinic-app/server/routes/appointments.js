// /routes/appointments.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointmentCtrl');
const { protect, authorize } = require('../middlewares/auth');

// Patient books an appointment
router.post('/book',
  protect,
  authorize('patient'),
  [
    body('doctor').notEmpty(),
    body('date').notEmpty(),
    body('time').notEmpty()
  ],
  appointmentCtrl.bookAppointment
);

// Patient lists their appointments
router.get('/my', protect, authorize('patient'), appointmentCtrl.listPatientAppointments);

// Doctor see appointments
router.get('/doctor', protect, authorize('doctor'), appointmentCtrl.listDoctorAppointments);

// Admin: list all (with pagination)
router.get('/', protect, authorize('admin'), appointmentCtrl.listAllAppointments);

// Update status (doctor or admin)
router.put('/:id/status', protect, authorize('doctor', 'admin'), appointmentCtrl.updateStatus);

// Cancel (patient)
router.delete('/:id/cancel', protect, authorize('patient'), appointmentCtrl.cancelAppointment);

module.exports = router;
