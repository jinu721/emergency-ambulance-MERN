"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverService_1 = __importDefault(require("../services/driverService"));
class DriverController {
    static async getDrivers(req, res) {
        try {
            const drivers = await driverService_1.default.getDrivers();
            res.status(200).json({ drivers });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async createDriver(req, res) {
        try {
            const driver = await driverService_1.default.createDriver(req.body);
            res.status(201).json({ driver });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getDriverById(req, res) {
        try {
            const driver = await driverService_1.default.getDriverById(req.params.id);
            res.status(200).json({ driver });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateDriver(req, res) {
        try {
            const updatedDriver = await driverService_1.default.updateDriver(req.params.id, req.body);
            res.status(200).json({ updatedDriver });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async deleteDriver(req, res) {
        try {
            await driverService_1.default.deleteDriver(req.params.id);
            res.status(200).json({ message: 'Driver deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = DriverController;
