import BookingModel from '../models/bookingModel';

class BookingService {
  static async createBooking(bookingData: any) {
    const booking = new BookingModel(bookingData);
    await booking.save();
    return booking;
  }

  static async getBookings() {
    return await BookingModel.find();
  }

  static async getBookingById(bookingId: string) {
    const booking = await BookingModel.findById(bookingId);
    if (!booking) throw new Error('Booking not found');
    return booking;
  }

  static async updateBooking(bookingId: string, updateData: any) {
    const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, updateData, { new: true });
    if (!updatedBooking) throw new Error('Booking not found');
    return updatedBooking;
  }

  static async cancelBooking(bookingId: string) {
    const cancelledBooking = await BookingModel.findByIdAndDelete(bookingId);
    if (!cancelledBooking) throw new Error('Booking not found');
  }
}

export default BookingService;
