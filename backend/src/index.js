import express, { urlencoded } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PORT } from './config/serverConfig.js';
import apiRouter from '../src/routes/index.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

io.on('connection', () => {
  console.log('A user is connected');
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
