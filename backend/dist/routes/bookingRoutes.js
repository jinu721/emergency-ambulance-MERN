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
router.get('/:id', bookingController_1.default.getBookingById);
router.put('/:id', bookingController_1.default.updateBooking);
router.delete('/:id', bookingController_1.default.cancelBooking);
exports.default = router;
