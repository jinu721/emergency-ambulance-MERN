"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    ambulance: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Ambulance', required: true },
    driverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Driver' },
    pickupLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    dropLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Booking', bookingSchema);
