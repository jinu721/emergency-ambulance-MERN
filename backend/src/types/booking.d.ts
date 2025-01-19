import { Document,Types } from "mongoose";

export interface BookingIF extends Document {
    user: Types.ObjectId; 
    ambulance: Types.ObjectId; 
    driverId?: string; 
    // pickupLocation?: {
    //   latitude: number;
    //   longitude: number;
    // };
    // dropLocation?: {
    //   latitude: number;
    //   longitude: number;
    // };
    dropLocation:{
      street:string;
      city:string;
      phone:string;
    };
    status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
    createdAt?: Date;
    updatedAt?: Date;
  }
  