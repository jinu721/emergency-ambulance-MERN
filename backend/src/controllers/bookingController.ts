import { Request, Response } from 'express';
import BookingService from '../services/bookingService';

class BookingController {
  static async createBooking(req: Request, res: Response) {
    try {
      console.log(req.body.data)
      const booking = await BookingService.createBooking(req.body.data);
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
  static async getBookingsByUser(req: Request, res: Response) {
    try {
      const {userId} = req.params;
      const bookings = await BookingService.getBookingsByUser(userId);
      res.status(200).json({ bookings });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBookingById(req: Request, res: Response) {
    try {
      const bookings = await BookingService.getBookingById(req.params.id);
      res.status(200).json({ bookings });
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
  static async acceptBooking(req: Request, res: Response) {
    try {
      const acceptBooking = await BookingService.acceptBooking(req.params.id);
      res.status(200).json({ acceptBooking });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
  static async rejectBooking(req: Request, res: Response) {
    try {
      const rejectBooking = await BookingService.rejectBooking(req.params.id);
      res.status(200).json({ rejectBooking });
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
