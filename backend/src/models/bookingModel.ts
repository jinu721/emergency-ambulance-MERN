import { Schema, model } from 'mongoose';
import { BookingIF } from '../types/booking';

const bookingSchema = new Schema<BookingIF>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ambulance: { type: Schema.Types.ObjectId, ref: 'Ambulance', required: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
  // pickupLocation: {
  //   latitude: { type: Number, required: true },
  //   longitude: { type: Number, required: true },
  // },
  // dropLocation: {
  //   latitude: { type: Number, required: true },
  //   longitude: { type: Number, required: true },
  // },
  dropLocation:{
    street:{type:String},
    city:{type:String},
    phone:{type:String},
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<BookingIF>('Booking', bookingSchema);
