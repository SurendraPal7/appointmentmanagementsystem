const express = require('express');
const router = express.Router();
const { getTreatments, createTreatment, getTreatmentById } = require('../controllers/treatmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTreatments)
    .post(protect, admin, createTreatment);

router.route('/:id')
    .get(getTreatmentById);

module.exports = router;
