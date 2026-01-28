const Treatment = require('../models/Treatment');

// @desc    Get all treatments and remedies
// @route   GET /api/treatments
// @access  Public
const getTreatments = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                $or: [
                    { disease: { $regex: req.query.keyword, $options: 'i' } },
                    { title: { $regex: req.query.keyword, $options: 'i' } },
                    { description: { $regex: req.query.keyword, $options: 'i' } },
                ],
            }
            : {};

        const treatments = await Treatment.find({ ...keyword });
        res.json(treatments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new treatment/remedy
// @route   POST /api/treatments
// @access  Private/Admin
const createTreatment = async (req, res) => {
    try {
        const { title, type, disease, description, steps, image, precautions } = req.body;

        const treatment = new Treatment({
            title,
            type,
            disease,
            description,
            steps,
            image,
            precautions
        });

        const createdTreatment = await treatment.save();
        res.status(201).json(createdTreatment);
    } catch (error) {
        res.status(400).json({ message: 'Invalid treatment data' });
    }
};

// @desc    Get treatment by ID
// @route   GET /api/treatments/:id
// @access  Public
const getTreatmentById = async (req, res) => {
    try {
        const treatment = await Treatment.findById(req.params.id);
        if (treatment) {
            res.json(treatment);
        } else {
            res.status(404).json({ message: 'Treatment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getTreatments, createTreatment, getTreatmentById };
