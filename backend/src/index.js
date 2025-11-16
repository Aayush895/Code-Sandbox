import express, { urlencoded } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import chokidar from 'chokidar';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { PORT } from './config/serverConfig.js';
import apiRouter from '../src/routes/index.js';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';
import { handleContainerCreate } from './containers/handleContainerCreation.js';
import { handleTerminalCreation } from './containers/handleTerminalCreation.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

let editorNamespace = io.of('/editors');
editorNamespace.on('connection', (socket) => {
  console.log(
    'Editor Connected with projectID: ',
    socket.handshake.query.projectId,
  );

  let projectId = socket.handshake.query.projectId; // Will write logic to retrieve the actual project id

  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes('node_modules'),
      persistent: true /** Keeps the watcher in running state till the time app is running */,
      awaitWriteFinish: {
        stabilityThreshold: 2000 /** Ensures stability of files before triggering event */,
      },
      ignoreInitial: true /** Ignores the initial files in the directory */,
    });

    watcher.on('all', (event, path) => {
      console.log(event, path);
    });
  }

  handleEditorSocketEvents(socket, projectId, editorNamespace);
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const terminalWebSocket = new WebSocketServer({
  noServer: true, // Will handle the upgrade event for upgrading the http connection to socket connection
});

server.on('upgrade', (req, tcp, head) => {
  /**
   * req: Incoming http request
   * socket: TCP Socket
   * head: Buffer containing the first packet of the upgraded stream
   *
   * This callback will be called when a client tries to connect to the server through websocket
   */

  const isTerminal = req.url.includes('/terminal');

  if (isTerminal) {
    console.log('Req url received: ', req.url);
    const projectId = req.url.split('=')[1];
    console.log('Project id received after connection: ', projectId);

    handleContainerCreate(projectId, terminalWebSocket, req, tcp, head);
  }
});

terminalWebSocket.on('connection', (socket, req, container) => {
  console.log('Terminal connected');
  handleTerminalCreation(container, socket);
  socket.on('close', () => {
    container.remove({ force: true }, (err, data) => {
      if (err) {
        console.log('Error while removing container: ', err);
      
      }

      console.log('Container removed: ', data);
    });
  });
});
