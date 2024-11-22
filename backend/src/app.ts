import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
connectDB();

dotenv.config();

app.use(bodyParser.json());
app.use('/api/rovers', routes);

mongoose
  .connect(process.env.MONG_URL || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error: ', err));

export default app;