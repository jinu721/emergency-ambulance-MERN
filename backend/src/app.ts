import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import {connectDB} from './config/dbConfig'
import { errorHandler } from './middlewares/errorHandler'; 

import ambulanceRoutes from './routes/ambulanceRoutes';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import driversRoutes from './routes/driverRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(morgan('dev')); 


app.use('/api/ambulances', ambulanceRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', bookingRoutes);

app.use(errorHandler);


connectDB();

export default app;
