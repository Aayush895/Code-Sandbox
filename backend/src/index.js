import express, { urlencoded } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import chokidar from 'chokidar';
import cors from 'cors';
import { PORT } from './config/serverConfig.js';
import apiRouter from '../src/routes/index.js';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';

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

  // socket.on('disconnect', async () => {
  //   await watcher.close();
  //   console.log('Editor disconnected');
  // });
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
