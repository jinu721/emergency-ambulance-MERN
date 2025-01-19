"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
class BookingService {
    static async createBooking(bookingData) {
        try {
            const booking = new bookingModel_1.default(bookingData);
            await booking.save();
            return booking;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async getBookings() {
        try {
            return await bookingModel_1.default.find().populate("user");
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async getBookingById(driverId) {
        try {
            const booking = await bookingModel_1.default.find({ driverId }).populate("user").populate("ambulance");
            if (!booking)
                throw new Error('Booking not found');
            return booking;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async updateBooking(bookingId, updateData) {
        try {
            const updatedBooking = await bookingModel_1.default.findByIdAndUpdate(bookingId, updateData, { new: true });
            if (!updatedBooking)
                throw new Error('Booking not found');
            return updatedBooking;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async cancelBooking(bookingId) {
        try {
            const cancelledBooking = await bookingModel_1.default.findByIdAndDelete(bookingId);
            if (!cancelledBooking)
                throw new Error('Booking not found');
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
exports.default = BookingService;
