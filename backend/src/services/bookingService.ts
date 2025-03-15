import BookingModel from '../models/bookingModel';

class BookingService {
  static async createBooking(bookingData: any) {
    try{
      const booking = new BookingModel(bookingData);
      await booking.save();
      return booking;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async getBookings() {
    try{
      return await BookingModel.find().populate("user")
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  static async getBookingsByUser(userId:string) {
    try{
      return await BookingModel.find({user:userId}).populate("user")
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async getBookingById(driverId: string) {
    try{
      const booking = await BookingModel.find({driverId}).populate("user").populate("ambulance")
      if (!booking) throw new Error('Booking not found');
      return booking;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async updateBooking(bookingId: string, updateData: any) {
    try{
      const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, updateData, { new: true });
      if (!updatedBooking) throw new Error('Booking not found');
      return updatedBooking;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async acceptBooking(bookingId: string) {
    try{
      const acceptBooking = await BookingModel.findByIdAndUpdate(bookingId,{status:'accepted'}, { new: true });
      if (!acceptBooking) throw new Error('Booking not found');
      return acceptBooking;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  static async rejectBooking(bookingId: string) {
    try{
      const rejectBooking = await BookingModel.findByIdAndUpdate(bookingId,{status:'rejected'}, { new: true });
      if (!rejectBooking) throw new Error('Booking not found');
      return rejectBooking;
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  static async cancelBooking(bookingId: string) {
    try{
      const cancelledBooking = await BookingModel.findByIdAndDelete(bookingId);
      if (!cancelledBooking) throw new Error('Booking not found');
    }catch(err){
      console.log(err);
      throw err;
    }
  }
}

export default BookingService;
