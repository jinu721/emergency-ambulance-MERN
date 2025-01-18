import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

class DriverService {
  static async getDrivers() {
    try{   
      const drivers = await UserModel.find({role:'driver'});
      if (!drivers) throw new Error('No drivers yet');
      return drivers;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  static async createDriver(id: any,role:string) {
    try{
      return await UserModel.findByIdAndUpdate(id,{role},{ new: true });
    }catch(err){
      console.log(err);
      throw err
    }
  }

  // static async loginDriver(driverData: any) {
  //   const { email, password } = driverData;

  //   const user = await UserModel.findOne({ email });
  //   if (!user) throw new Error('Invalid Email');

  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) throw new Error('Invalid Password');

  //   // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  //   // return token;
  // }

  // static async getDriverProfile(userId: string) {
  //   const user = await UserModel.findById(userId);
  //   if (!user) throw new Error('Driver not found');
  //   return user;
  // }

  // static async updateDriverProfile(userId: string, updateData: any) {
  //   const updatedDriver = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
  //   if (!updatedDriver) throw new Error('Driver not found');
  //   return updatedDriver;
  // }

  // static async deleteDriver(userId: string) {
  //   const deletedDriver = await UserModel.findByIdAndDelete(userId);
  //   if (!deletedDriver) throw new Error('Driver not found');
  // }
}

export default DriverService;
