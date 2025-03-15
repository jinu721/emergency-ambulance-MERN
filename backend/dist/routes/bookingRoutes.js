"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const router = express_1.default.Router();
router.post('/', bookingController_1.default.createBooking);
router.get('/', bookingController_1.default.getBookings);
router.get('/user/:userId', bookingController_1.default.getBookingsByUser);
router.get('/:id', bookingController_1.default.getBookingById);
router.put('/:id', bookingController_1.default.updateBooking);
router.delete('/:id', bookingController_1.default.cancelBooking);
router.put('/accept/:id', bookingController_1.default.acceptBooking);
router.put('/reject/:id', bookingController_1.default.rejectBooking);
exports.default = router;
