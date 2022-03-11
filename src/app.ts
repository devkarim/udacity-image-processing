import express from 'express';
import { PORT } from './config/constants';
import cors from 'cors';
import apiRouter from './routes/api';
import path from 'path';

const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', apiRouter);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Backend says hi');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

export default app;
