const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number, // Years of experience
    },
    qualification: {
        type: String,
    },
    bio: {
        type: String,
    },
    consultationFee: {
        type: Number,
        required: true,
    },
    clinics: [{
        clinic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
        },
        days: [String], // e.g., ["Monday", "Wednesday"]
        timeSlots: [{
            start: String,
            end: String,
        }]
    }]
}, { timestamps: true });

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);
module.exports = DoctorProfile;
