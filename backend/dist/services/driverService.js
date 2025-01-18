"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import jwt from 'jsonwebtoken';
const userModel_1 = __importDefault(require("../models/userModel"));
class DriverService {
    static async getDrivers() {
        try {
            const drivers = await userModel_1.default.find({ role: 'driver' });
            if (!drivers)
                throw new Error('No drivers yet');
            return drivers;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async createDriver(id) {
        try {
            return await userModel_1.default.findByIdAndUpdate(id, { role: 'driver' }, { new: true });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
exports.default = DriverService;
