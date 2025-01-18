import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

class UserService {
  static async registerUser(userData: any) {
    try{
      const { name,email, password,phone } = userData;
      const existingUserEmail = await UserModel.findOne({ email });
      if (existingUserEmail) throw new Error('User email already exists');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({name,email,phone,password: hashedPassword,role:'user'});
      await user.save();
      const token = jwt.sign({ id: user._id }, 'symteron3737', { expiresIn: '1h' });
      return { user, token };
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async loginUser(userData: any) {
    try{
      const { email, password } = userData;
  
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error('Invalid Username');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid Password');
  
      const token = jwt.sign({ id: user._id }, "symteron3737", { expiresIn: '1h' });
      return token;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async validateToken(authorization: string | null): Promise<void> {
    try {
      if (authorization) {
        const token = authorization.slice(7, authorization.length);
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
