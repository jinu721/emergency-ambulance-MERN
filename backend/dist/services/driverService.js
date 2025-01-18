"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverModel_1 = __importDefault(require("../models/driverModel"));
class DriverService {
    static async getDrivers() {
        return await driverModel_1.default.find();
    }
    static async createDriver(driverData) {
        const driver = new driverModel_1.default(driverData);
        await driver.save();
        return driver;
    }
    static async getDriverById(driverId) {
        const driver = await driverModel_1.default.findById(driverId);
        if (!driver)
            throw new Error('Driver not found');
        return driver;
    }
    static async updateDriver(driverId, updateData) {
        const updatedDriver = await driverModel_1.default.findByIdAndUpdate(driverId, updateData, { new: true });
        if (!updatedDriver)
            throw new Error('Driver not found');
        return updatedDriver;
    }
    static async deleteDriver(driverId) {
        const deletedDriver = await driverModel_1.default.findByIdAndDelete(driverId);
        if (!deletedDriver)
            throw new Error('Driver not found');
    }
}
exports.default = DriverService;
