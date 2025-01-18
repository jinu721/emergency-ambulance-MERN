import { Document } from "mongoose";

export interface AmbulanceIF extends Document {
    numberPlate: string;
    driverId?: string; 
    isAvailable: boolean;
    location?: {
      latitude: number;
      longitude: number;
    };
    type: 'basic' | 'advanced' | 'ICU'; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  