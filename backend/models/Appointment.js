const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User (Doctor)
        required: true,
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlot: {
        type: String, // e.g., "10:00 - 10:30"
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-Show'],
        default: 'Pending',
    },
    type: {
        type: String, // e.g. "Consultation", "Therapy"
        default: "Consultation"
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Refunded'],
        default: 'Pending',
    },
    amount: {
        type: Number,
    },
    notes: {
        type: String, // Doctor's notes
    },
    prescription: {
        type: String, // Could be a text or link to file
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
