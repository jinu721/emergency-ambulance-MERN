"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
class UserService {
    static async getUsers() {
        try {
            return await userModel_1.default.find();
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async registerUser(userData) {
        try {
            const { name, email, password, phone } = userData.formData;
            console.log(name, email, password, phone);
            const existingUserEmail = await userModel_1.default.findOne({ email });
            if (existingUserEmail)
                throw new Error('User email already exists');
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = new userModel_1.default({ name, email, phone, password: hashedPassword, role: 'user' });
            await user.save();
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, 'symteron3737', { expiresIn: '1h' });
            return { user, token };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async loginUser(userData) {
        try {
            console.log(userData);
            const { email, password } = userData.formData;
            const user = await userModel_1.default.findOne({ email });
            if (!user)
                throw new Error('Invalid Username');
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error('Invalid Password');
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, "symteron3737", { expiresIn: '1h' });
            return { user, token };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async validateToken(authorization) {
        try {
            if (authorization) {
                const token = authorization.slice(7, authorization.length);
                const decoded = jsonwebtoken_1.default.verify(token, 'symteron3737');
                return decoded;
            }
            else {
                throw new Error('Invalid Token');
            }
        }
        catch (err) {
            console.log(err);
            throw new Error('Invalid Token');
        }
    }
    static async getUserProfile(userId) {
        try {
            const user = await userModel_1.default.findById(userId);
            if (!user)
                throw new Error('User not found');
            return user;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async updateUserProfile(userId, updateData) {
        try {
            const updatedUser = await userModel_1.default.findByIdAndUpdate(userId, updateData, { new: true });
            if (!updatedUser)
                throw new Error('User not found');
            return updatedUser;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteUser(userId) {
        try {
            const deletedUser = await userModel_1.default.findByIdAndDelete(userId);
            if (!deletedUser)
                throw new Error('User not found');
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
exports.default = UserService;
