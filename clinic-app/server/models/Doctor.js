// /models/Doctor.js
import { Schema, model } from 'mongoose';

const DoctorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  specialization: { type: String, required: true },
  bio: { type: String },
  // availability: array of objects defining weekdays / time slots or free-text
  availability: [
    {
      day: { type: String }, // e.g., "Mon"
      start: { type: String }, // e.g., "09:00"
      end: { type: String } // e.g., "17:00"
    }
  ],
  maxAppointmentsPerDay: { type: Number, default: 30 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

DoctorSchema.index({ user: 1 });

export default model('Doctor', DoctorSchema);
