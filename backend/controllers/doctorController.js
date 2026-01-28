const DoctorProfile = require('../models/DoctorProfile');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    const doctors = await DoctorProfile.find({})
        .populate('user', 'name email phone')
        .populate('clinics.clinic', 'name address');
    res.json(doctors);
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
    const doctor = await DoctorProfile.findById(req.params.id)
        .populate('user', 'name email phone')
        .populate('clinics.clinic', 'name address');

    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

// @desc    Create/Update doctor profile
// @route   POST /api/doctors
// @access  Private (Doctor/Admin)
const createDoctorProfile = async (req, res) => {
    const {
        specialization,
        experience,
        qualification,
        bio,
        consultationFee,
        clinics, // Array of clinic objects with schedule
    } = req.body;

    // Use the ID from the token (if doctor) or passed ID (if admin creating for doctor)
    // For simplicity, assuming the logged in user is the doctor or we pass userId in body for Admin
    const userId = req.body.userId || req.user._id;

    const doctorFields = {
        user: userId,
        specialization,
        experience,
        qualification,
        bio,
        consultationFee,
        clinics,
    };

    let doctor = await DoctorProfile.findOne({ user: userId });

    if (doctor) {
        // Update
        doctor = await DoctorProfile.findOneAndUpdate(
            { user: userId },
            { $set: doctorFields },
            { new: true }
        );
        res.json(doctor);
    } else {
        // Create
        doctor = new DoctorProfile(doctorFields);
        await doctor.save();
        res.status(201).json(doctor);
    }
};

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctorProfile,
};
