const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['treatment', 'remedy'],
        required: true
    },
    disease: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    symptoms: [{
        type: String
    }],
    steps: {
        type: [String],
        required: true
    },
    duration: String, // Allowing String for flexibility e.g. "10 mins"
    image: String,
    precautions: [String]
}, { timestamps: true });

const Treatment = mongoose.model('Treatment', treatmentSchema);
module.exports = Treatment;
