const Appointment = require('../models/Appointment');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Patient/Receptionist)
const createAppointment = async (req, res) => {
    const {
        doctor,
        clinic,
        date,
        timeSlot,
        type,
        amount,
        patientId, // Optional, if receptionist is booking
    } = req.body;

    const appointment = new Appointment({
        patient: patientId || req.user._id,
        doctor,
        clinic,
        date,
        timeSlot,
        type,
        amount,
        paymentStatus: 'Pending', // Placeholder
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
};

// @desc    Get logged in user appointments
// @route   GET /api/appointments/myappointments
// @access  Private
const getMyAppointments = async (req, res) => {
    let appointments;
    if (req.user.role === 'patient') {
        appointments = await Appointment.find({ patient: req.user._id })
            .populate('doctor', 'name email')
            .populate('clinic', 'name address');
    } else if (req.user.role === 'doctor') {
        appointments = await Appointment.find({ doctor: req.user._id })
            .populate('patient', 'name email phone')
            .populate('clinic', 'name address');
    } else {
        // Fallback or potentially admin view
        appointments = [];
    }

    res.json(appointments);
};

// @desc    Get all appointments (Admin/Receptionist)
// @route   GET /api/appointments
// @access  Private (Admin/Receptionist)
const getAppointments = async (req, res) => {
    const appointments = await Appointment.find({})
        .populate('patient', 'name email')
        .populate('doctor', 'name email');
    res.json(appointments);
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Doctor/Admin/Receptionist)
const updateAppointmentStatus = async (req, res) => {
    const { status, notes, prescription } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
        appointment.status = status || appointment.status;
        if (notes) appointment.notes = notes;
        if (prescription) appointment.prescription = prescription;

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
};

module.exports = {
    createAppointment,
    getMyAppointments,
    getAppointments,
    updateAppointmentStatus,
};
