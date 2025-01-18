"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
class UserService {
    static async registerUser(userData) {
        const { name, email, password, phone, } = userData;
        const existingUserName = await userModel_1.default.findOne({ name });
        const existingUserEmail = await userModel_1.default.findOne({ email });
        if (existingUserName)
            throw new Error('User name already exists');
        if (existingUserEmail)
            throw new Error('User email already exists');
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new userModel_1.default({ ...userData, password: hashedPassword });
        await user.save();
        return user;
    }
    static async loginUser(userData) {
        const { email, password } = userData;
        const user = await userModel_1.default.findOne({ email });
        if (!user)
            throw new Error('Invalid Username');
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error('Invalid Password');
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    static async getUserProfile(userId) {
        const user = await userModel_1.default.findById(userId);
        if (!user)
            throw new Error('User not found');
        return user;
    }
    static async updateUserProfile(userId, updateData) {
        const updatedUser = await userModel_1.default.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser)
            throw new Error('User not found');
        return updatedUser;
    }
    static async deleteUser(userId) {
        const deletedUser = await userModel_1.default.findByIdAndDelete(userId);
        if (!deletedUser)
            throw new Error('User not found');
    }
}
exports.default = UserService;
