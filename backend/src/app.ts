import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import connectDB from './config/db';

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/rovers', routes);

export default app;