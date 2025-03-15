"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ambulanceModel_1 = __importDefault(require("../models/ambulanceModel"));
class AmbulanceService {
    static async createAmbulance(ambulanceData) {
        const { numberPlate, type, driverId } = ambulanceData;
        const ambulance = new ambulanceModel_1.default(ambulanceData);
        await ambulance.save();
        return ambulance;
    }
    static async getAllAmbulances() {
        return await ambulanceModel_1.default.find().populate("driverId");
    }
    static async getAmbulanceById(ambulanceId) {
        const ambulance = await ambulanceModel_1.default.findById(ambulanceId);
        if (!ambulance)
            throw new Error('Ambulance not found');
        return ambulance;
    }
    static async updateAmbulance(ambulanceId, updateData) {
        const updatedAmbulance = await ambulanceModel_1.default.findByIdAndUpdate(ambulanceId, updateData, { new: true });
        if (!updatedAmbulance)
            throw new Error('Ambulance not found');
        return updatedAmbulance;
    }
    static async deleteAmbulance(ambulanceId) {
        const deletedAmbulance = await ambulanceModel_1.default.findByIdAndDelete(ambulanceId);
        if (!deletedAmbulance)
            throw new Error('Ambulance not found');
    }
}
exports.default = AmbulanceService;
