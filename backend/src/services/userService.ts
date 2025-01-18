import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

class UserService {
  static async registerUser(userData: any) {
    const { name,email, password,phone, } = userData;
    const existingUserEmail = await UserModel.findOne({ email });
    if (existingUserEmail) throw new Error('User email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({name,email,phone,password: hashedPassword,role:'user'});
    await user.save();
    return user;
  }

  static async loginUser(userData: any) {
    const { email, password } = userData;

    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Invalid Username');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid Password');

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    // return token;
  }

  static async getUserProfile(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  }

  static async updateUserProfile(userId: string, updateData: any) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  static async deleteUser(userId: string) {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error('User not found');
  }
}

export default UserService;
