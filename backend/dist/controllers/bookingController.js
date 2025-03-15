"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingService_1 = __importDefault(require("../services/bookingService"));
class BookingController {
    static async createBooking(req, res) {
        try {
            console.log(req.body.data);
            const booking = await bookingService_1.default.createBooking(req.body.data);
            res.status(201).json({ booking });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getBookings(req, res) {
        try {
            const bookings = await bookingService_1.default.getBookings();
            res.status(200).json({ bookings });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getBookingsByUser(req, res) {
        try {
            const { userId } = req.params;
            const bookings = await bookingService_1.default.getBookingsByUser(userId);
            res.status(200).json({ bookings });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getBookingById(req, res) {
        try {
            const bookings = await bookingService_1.default.getBookingById(req.params.id);
            res.status(200).json({ bookings });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateBooking(req, res) {
        try {
            const updatedBooking = await bookingService_1.default.updateBooking(req.params.id, req.body);
            res.status(200).json({ updatedBooking });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async acceptBooking(req, res) {
        try {
            const acceptBooking = await bookingService_1.default.acceptBooking(req.params.id);
            res.status(200).json({ acceptBooking });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async rejectBooking(req, res) {
        try {
            const rejectBooking = await bookingService_1.default.rejectBooking(req.params.id);
            res.status(200).json({ rejectBooking });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async cancelBooking(req, res) {
        try {
            await bookingService_1.default.cancelBooking(req.params.id);
            res.status(200).json({ message: 'Booking cancelled successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = BookingController;
