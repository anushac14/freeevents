import express from 'express';
import cors from 'cors';
import './config/dotenv.js';
import eventsRouter from './routes/events.js';
import locationsRouter from './routes/locations.js';

const app = express();
app.use(cors());

app.use('/events', eventsRouter);
app.use('/locations', locationsRouter);

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
