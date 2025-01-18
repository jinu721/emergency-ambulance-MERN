import { Request, Response } from 'express';
import BookingService from '../services/bookingService';

class BookingController {
  static async createBooking(req: Request, res: Response) {
    try {
      const booking = await BookingService.createBooking(req.body);
      res.status(201).json({ booking });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBookings(req: Request, res: Response) {
    try {
      const bookings = await BookingService.getBookings();
      res.status(200).json({ bookings });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBookingById(req: Request, res: Response) {
    try {
      const booking = await BookingService.getBookingById(req.params.id);
      res.status(200).json({ booking });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateBooking(req: Request, res: Response) {
    try {
      const updatedBooking = await BookingService.updateBooking(req.params.id, req.body);
      res.status(200).json({ updatedBooking });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async cancelBooking(req: Request, res: Response) {
    try {
      await BookingService.cancelBooking(req.params.id);
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default BookingController;
