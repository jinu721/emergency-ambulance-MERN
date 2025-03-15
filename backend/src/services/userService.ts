import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

class UserService {
  static async getUsers() {
    try{
      return await UserModel.find();
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  
  static async registerUser(userData: any) {
    try{
      const { name,email, password,phone } = userData.formData;
      console.log(name,email,password,phone)
      const existingUserEmail = await UserModel.findOne({ email });
      if (existingUserEmail) throw new Error('User email already exists');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({name,email,phone,password: hashedPassword,role:'user'});
      await user.save();
      const token = jwt.sign({ id: user._id,role:user.role }, 'symteron3737', { expiresIn: '1h' });
      return { user, token };
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async loginUser(userData: any) {
    try{
      console.log(userData)
      const { email, password } = userData.formData;
  
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error('Invalid Username');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid Password');
  
      const token = jwt.sign({ id: user._id,role:user.role }, "symteron3737", { expiresIn: '1h' });
      return {user,token};
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async changePassword(userId: string, oldPassword: string, newPassword: string) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) throw new Error('Old password is incorrect');

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async validateToken(token: string | null): Promise<void> {
    try {
      if (token) {
        // const token = authorization.slice(7, authorization.length);
        const decoded = jwt.verify(token, 'symteron3737');
        return decoded as any;
      } else {
        throw new Error('Invalid Token');
      }
    } catch (err) {
      console.log(err);
      throw new Error('Invalid Token');
    }
  }

  static async getUserProfile(userId: string) {
    try{
      const user = await UserModel.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async updateUserProfile(userId: string, updateData: any) {
    try{
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) throw new Error('User not found');
      return updatedUser;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async deleteUser(userId: string) {
    try{
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      if (!deletedUser) throw new Error('User not found');
    }catch(err){
      console.log(err);
      throw err;
    }
  }
}

export default UserService;
