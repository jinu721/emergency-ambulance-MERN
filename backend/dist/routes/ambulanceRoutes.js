"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ambulanceController_1 = __importDefault(require("../controllers/ambulanceController"));
const router = express_1.default.Router();
router.post('/', ambulanceController_1.default.createAmbulance);
router.get('/', ambulanceController_1.default.getAllAmbulances);
router.get('/:id', ambulanceController_1.default.getAmbulanceById);
router.put('/:id', ambulanceController_1.default.updateAmbulance);
router.delete('/:id', ambulanceController_1.default.deleteAmbulance);
exports.default = router;
