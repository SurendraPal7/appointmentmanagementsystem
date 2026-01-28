const Clinic = require('../models/Clinic');

// @desc    Get all clinics
// @route   GET /api/clinics
// @access  Public
const getClinics = async (req, res) => {
    const clinics = await Clinic.find({});
    res.json(clinics);
};

// @desc    Get clinic by ID
// @route   GET /api/clinics/:id
// @access  Public
const getClinicById = async (req, res) => {
    const clinic = await Clinic.findById(req.params.id);

    if (clinic) {
        res.json(clinic);
    } else {
        res.status(404).json({ message: 'Clinic not found' });
    }
};

// @desc    Create a clinic
// @route   POST /api/clinics
// @access  Private/Admin
const createClinic = async (req, res) => {
    const { name, address, contactPhone, workingHours } = req.body;

    const clinic = new Clinic({
        name,
        address,
        contactPhone,
        workingHours, // Expecting { open: "09:00", close: "18:00" }
        admin: req.user._id,
    });

    const createdClinic = await clinic.save();
    res.status(201).json(createdClinic);
};

// @desc    Update a clinic
// @route   PUT /api/clinics/:id
// @access  Private/Admin
const updateClinic = async (req, res) => {
    const { name, address, contactPhone, workingHours } = req.body;

    const clinic = await Clinic.findById(req.params.id);

    if (clinic) {
        clinic.name = name || clinic.name;
        clinic.address = address || clinic.address;
        clinic.contactPhone = contactPhone || clinic.contactPhone;
        clinic.workingHours = workingHours || clinic.workingHours;

        const updatedClinic = await clinic.save();
        res.json(updatedClinic);
    } else {
        res.status(404).json({ message: 'Clinic not found' });
    }
};

// @desc    Delete a clinic
// @route   DELETE /api/clinics/:id
// @access  Private/Admin
const deleteClinic = async (req, res) => {
    const clinic = await Clinic.findById(req.params.id);

    if (clinic) {
        await clinic.deleteOne();
        res.json({ message: 'Clinic removed' });
    } else {
        res.status(404).json({ message: 'Clinic not found' });
    }
};

module.exports = {
    getClinics,
    getClinicById,
    createClinic,
    updateClinic,
    deleteClinic,
};
