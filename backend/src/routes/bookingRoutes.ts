import express from 'express';
import BookingController from '../controllers/bookingController';

const router = express.Router();

router.post('/', BookingController.createBooking);
router.get('/', BookingController.getBookings);
router.get('/:id',BookingController.getBookingById);
router.put('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.cancelBooking);

export default router;
