import express from 'express';
import bodyParser from 'body-parser';
import roverRoutes from './modules/rovers/routes';
import authRoutes from './modules/auth/routes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';


import { errorHandler } from './shared/middlewares/errorHandler';
dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/api/rovers', authRoutes);
app.use('/api/rovers', roverRoutes);

app.use(errorHandler);

export default app;