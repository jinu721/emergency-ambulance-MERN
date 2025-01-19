import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {connectDB} from './config/dbConfig'
import { errorHandler } from './middlewares/errorHandler'; 
// import { authMiddleware } from './middlewares/authMiddleware'; 

import ambulanceRoutes from './routes/ambulanceRoutes';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import driversRoutes from './routes/driverRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(morgan('dev')); 

// const corsOptions = {
//     origin: ['http://localhost:3000','http://localhost:3001'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH','HEAD','OPTION'],
//     allowedHeaders: ['Content-Type', 'Authorization'], 
//     credentials: true
//   };
  
//   app.use(cors(corsOptions));

// app.use(authMiddleware);

app.use('/api/ambulances', ambulanceRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);


connectDB();

export default app;
