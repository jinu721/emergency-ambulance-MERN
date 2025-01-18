"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'driver'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    // address: {
    //   street: { type: String },
    //   city: { type: String },
    //   state: { type: String },
    //   zipCode: { type: String },
    // },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
