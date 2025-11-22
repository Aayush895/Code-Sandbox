import express, { urlencoded } from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { handleContainerCreate } from './containers/handleContainerCreation.js';
import { handleTerminalCreation } from './containers/handleTerminalCreation.js';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

server.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});

const terminalWebSocket = new WebSocketServer({
  server,
});

terminalWebSocket.on('connection', async (socket, req, container) => {
  console.log('Terminal connected');
  const isTerminal = req.url.includes('/terminal');

  if (isTerminal) {
    console.log('Req url received: ', req.url);
    const projectId = req.url.split('=')[1];
    console.log('Project id received after connection: ', projectId);

    const container = await handleContainerCreate(projectId);
    handleTerminalCreation(container, socket);
  }
});
