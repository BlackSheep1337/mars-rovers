import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
connectDB();


app.use(bodyParser.json());
app.use('/api/rovers', routes);

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error: ', err));

export default app;