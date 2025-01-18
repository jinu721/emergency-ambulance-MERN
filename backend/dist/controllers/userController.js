"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    static async registerUser(req, res) {
        try {
            const user = await userService_1.default.registerUser(req.body);
            res.status(201).json({ user });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async loginUser(req, res) {
        try {
            const token = await userService_1.default.loginUser(req.body);
            res.status(200).json({ token });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getUserProfile(req, res) {
        try {
            const user = await userService_1.default.getUserProfile(req.user?.id);
            res.status(200).json({ user });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateUserProfile(req, res) {
        try {
            const updatedUser = await userService_1.default.updateUserProfile(req.user?.id, req.body);
            res.status(200).json({ updatedUser });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async deleteUser(req, res) {
        try {
            await userService_1.default.deleteUser(req.params.id);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = UserController;
