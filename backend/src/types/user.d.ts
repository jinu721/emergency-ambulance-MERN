import { Document } from "mongoose";
import roleEnum from '../utils/roleEnum';

export interface UserIF extends Document {
  name: string;
  email: string;
  password: string;
  role:Role;
  phone:string;
  isVerified: boolean; 
  // address?: {
  //   street?: string;
  //   city?: string;
  //   state?: string;
  //   zipCode?: string;
  // };
  createdAt?: Date;
  updatedAt?: Date;
}
