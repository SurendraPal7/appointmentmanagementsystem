const express = require('express');
const router = express.Router();
const {
    getClinics,
    getClinicById,
    createClinic,
    updateClinic,
    deleteClinic,
} = require('../controllers/clinicController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getClinics).post(protect, admin, createClinic);
router
    .route('/:id')
    .get(getClinicById)
    .put(protect, admin, updateClinic)
    .delete(protect, admin, deleteClinic);

module.exports = router;
