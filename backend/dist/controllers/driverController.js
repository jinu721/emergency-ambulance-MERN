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
            res.status(201).json({ drivers });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    static async createDriver(req, res) {
        try {
            const driver = await driverService_1.default.createDriver(req.params.id);
            res.status(201).json({ driver });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = DriverController;
