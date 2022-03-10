import express from 'express';
import { PORT } from './config/constants';
import cors from 'cors';
import apiRouter from './routes/api';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
