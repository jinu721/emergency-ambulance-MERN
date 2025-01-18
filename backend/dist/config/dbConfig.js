"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        // const url = process.env.MONGO_URL;
        // if(!url) throw new Error('Mongo url not defined in env');
        await mongoose_1.default.connect("mongodb://localhost:27017/emergencyAmbulance");
        console.log('Mongo connected');
    }
    catch (err) {
        console.error(err.message);
    }
};
exports.connectDB = connectDB;
