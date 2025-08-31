import express, { urlencoded } from 'express';
import cors from 'cors';

import { PORT } from './config/serverConfig.js';
import apiRouter from '../src/routes/index.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
