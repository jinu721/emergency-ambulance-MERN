import { Schema, model } from 'mongoose';
import { UserIF } from '../types/user';

const userSchema = new Schema<UserIF>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'driver'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  // address: {
  //   street: { type: String },
  //   city: { type: String },
  //   state: { type: String },
  //   zipCode: { type: String },
  // },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default  model<UserIF>('User', userSchema);
