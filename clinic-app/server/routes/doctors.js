// /routes/doctors.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const doctorCtrl = require('../controllers/doctorCtrl');
const { protect, authorize } = require('../middlewares/auth');

// Public: list doctors
router.get('/', doctorCtrl.listDoctors);

// Create doctor profile (admin or doctor)
router.post('/',
  protect,
  authorize('admin', 'doctor'),
  [
    body('user').notEmpty().withMessage('user id required'),
    body('specialization').notEmpty().withMessage('specialization required')
  ],
  doctorCtrl.createDoctor
);

// Update doctor profile
router.put('/:id', protect, authorize('admin','doctor'), doctorCtrl.updateDoctor);

// Get single doctor
router.get('/:id', doctorCtrl.getDoctor);

module.exports = router;
