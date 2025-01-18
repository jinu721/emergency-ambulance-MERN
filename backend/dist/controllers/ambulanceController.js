"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ambulanceService_1 = __importDefault(require("../services/ambulanceService"));
class AmbulanceController {
    static async createAmbulance(req, res) {
        try {
            const ambulance = await ambulanceService_1.default.createAmbulance(req.body);
            res.status(201).json({ ambulance });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getAllAmbulances(req, res) {
        try {
            const ambulances = await ambulanceService_1.default.getAllAmbulances();
            res.status(200).json({ ambulances });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getAmbulanceById(req, res) {
        try {
            const ambulance = await ambulanceService_1.default.getAmbulanceById(req.params.id);
            res.status(200).json({ ambulance });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateAmbulance(req, res) {
        try {
            const updatedAmbulance = await ambulanceService_1.default.updateAmbulance(req.params.id, req.body);
            res.status(200).json({ updatedAmbulance });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async deleteAmbulance(req, res) {
        try {
            await ambulanceService_1.default.deleteAmbulance(req.params.id);
            res.status(200).json({ message: 'Ambulance deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = AmbulanceController;
