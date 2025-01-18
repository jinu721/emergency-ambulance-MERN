"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ambulanceSchema = new mongoose_1.Schema({
    numberPlate: { type: String, required: true, unique: true },
    driverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    isAvailable: { type: Boolean, default: true },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    type: { type: String, enum: ['basic', 'advanced', 'ICU'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Ambulance', ambulanceSchema);
