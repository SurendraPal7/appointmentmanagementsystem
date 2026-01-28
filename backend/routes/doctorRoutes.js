const express = require('express');
const router = express.Router();
const {
    getDoctors,
    getDoctorById,
    createDoctorProfile,
} = require('../controllers/doctorController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getDoctors).post(protect, createDoctorProfile);
router.route('/:id').get(getDoctorById);

module.exports = router;
