const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    workingHours: {
        open: String, // e.g., "09:00"
        close: String, // e.g., "18:00"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // The admin managing this branch
    }
}, { timestamps: true });

const Clinic = mongoose.model('Clinic', clinicSchema);
module.exports = Clinic;
