"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const driverSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    licenseNumber: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    assignedAmbulance: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Ambulance' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Driver', driverSchema);
