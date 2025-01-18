"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
class BookingService {
    static async createBooking(bookingData) {
        const booking = new bookingModel_1.default(bookingData);
        await booking.save();
        return booking;
    }
    static async getBookings() {
        return await bookingModel_1.default.find();
    }
    static async getBookingById(bookingId) {
        const booking = await bookingModel_1.default.findById(bookingId);
        if (!booking)
            throw new Error('Booking not found');
        return booking;
    }
    static async updateBooking(bookingId, updateData) {
        const updatedBooking = await bookingModel_1.default.findByIdAndUpdate(bookingId, updateData, { new: true });
        if (!updatedBooking)
            throw new Error('Booking not found');
        return updatedBooking;
    }
    static async cancelBooking(bookingId) {
        const cancelledBooking = await bookingModel_1.default.findByIdAndDelete(bookingId);
        if (!cancelledBooking)
            throw new Error('Booking not found');
    }
}
exports.default = BookingService;
