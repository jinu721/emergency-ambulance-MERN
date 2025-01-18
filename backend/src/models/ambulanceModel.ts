import { Schema, model } from 'mongoose';
import { AmbulanceIF } from '../types/ambulance';

const ambulanceSchema = new Schema<AmbulanceIF>({
  numberPlate: { type: String, required: true, unique: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'User' },
  isAvailable: { type: Boolean, default: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  type: { type: String, enum: ['basic', 'advanced', 'ICU'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<AmbulanceIF>('Ambulance', ambulanceSchema);
