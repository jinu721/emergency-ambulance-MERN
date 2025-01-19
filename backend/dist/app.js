"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = require("./config/dbConfig");
const errorHandler_1 = require("./middlewares/errorHandler");
// import { authMiddleware } from './middlewares/authMiddleware'; 
const ambulanceRoutes_1 = __importDefault(require("./routes/ambulanceRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const driverRoutes_1 = __importDefault(require("./routes/driverRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// const corsOptions = {
//     origin: ['http://localhost:3000','http://localhost:3001'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH','HEAD','OPTION'],
//     allowedHeaders: ['Content-Type', 'Authorization'], 
//     credentials: true
//   };
//   app.use(cors(corsOptions));
// app.use(authMiddleware);
app.use('/api/ambulances', ambulanceRoutes_1.default);
app.use('/api/drivers', driverRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/bookings', bookingRoutes_1.default);
app.use(errorHandler_1.errorHandler);
(0, dbConfig_1.connectDB)();
exports.default = app;
