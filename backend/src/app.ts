import express from 'express';
import bodyParser from 'body-parser';
import routes from './modules/rovers/routes';
import authRoutes from './modules/auth/routes'
import connectDB from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/rovers/auth', authRoutes);
app.use('/api/rovers', routes);

export default app;