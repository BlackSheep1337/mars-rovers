import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use('/api/rovers', routes);

app
  .listen(PORT)
  .on("listening", () => console.log(`Server running on port ${PORT}`));