import express from 'express';
import BookingController from '../controllers/bookingController';

const router = express.Router();

router.post('/', BookingController.createBooking);
router.get('/', BookingController.getBookings);
router.get('/user/:userId', BookingController.getBookingsByUser);
router.get('/:id',BookingController.getBookingById);
router.put('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.cancelBooking);
router.put('/accept/:id', BookingController.acceptBooking);
router.put('/reject/:id', BookingController.rejectBooking);

export default router;
