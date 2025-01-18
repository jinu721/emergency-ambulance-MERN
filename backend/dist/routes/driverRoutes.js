"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = __importDefault(require("../controllers/driverController"));
const router = express_1.default.Router();
router.get('/', driverController_1.default.getDrivers);
router.post('/', driverController_1.default.createDriver);
router.get('/:id', driverController_1.default.getDriverById);
router.put('/:id', driverController_1.default.updateDriver);
router.delete('/:id', driverController_1.default.deleteDriver);
exports.default = router;
