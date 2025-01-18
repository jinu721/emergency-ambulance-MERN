"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post('/register', userController_1.default.registerUser);
router.post('/login', userController_1.default.loginUser);
router.get('/profile/:id', userController_1.default.getUserProfile);
router.put('/profile', userController_1.default.updateUserProfile);
router.delete('/:id', userController_1.default.deleteUser);
router.post('/validate/token', userController_1.default.validateToken);
exports.default = router;
