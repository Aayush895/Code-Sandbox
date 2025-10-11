import fs from 'fs/promises';

export function handleEditorSocketEvents(socket) {
  socket.on('writeFile', async ({ data, pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      socket.emit('writeFileSuccess', {
        data: 'File written successfully',
      });
    } catch (error) {
      console.log('Error writing the file: ', error);
      socket.emit('error', {
        data: 'Error writing the file',
      });
    }
  });

  socket.on('createFile', async ({ pathToFileOrFolder }) => {
    const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
    if (isFileAlreadyPresent) {
      socket.emit('Error', {
        data: 'File already exists',
      });
    }

    try {
      const response = await fs.writeFile(pathToFileOrFolder);
      socket.emit('createFileSuccess', {
        data: 'File created successfully',
      });
    } catch (error) {
      console.log('Error in creating the file: ', error);
      socket.emit('Error', {
        data: 'Error creating the file',
      });
    }
  });

  socket.on('readFile', async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.readFile(pathToFileOrFolder);
      socket.emit('readFileSuccess', {
        data: response.toString(),
        activeFile: pathToFileOrFolder,
      });
    } catch (error) {
      console.log('Error reading the file: ', error);
      socket.emit('Error', {
        data: 'Error reading the file',
      });
    }
  });

  socket.on('deleteFile', async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.unlink(pathToFileOrFolder);
      socket.emit('deleteFileSuccess', {
        data: 'File deleted successfully',
      });
    } catch (error) {
      console.log('Error deleting the file: ', error);
      socket.emit('error', {
        data: 'Error deleting the file',
      });
    }
  });

  socket.on('createFolder', async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.mkdir(pathToFileOrFolder);
      socket.emit('createFolderSuccess', {
        data: 'Folder created successfully',
      });
    } catch (error) {
      console.log('Error creating the folder: ', error);
      socket.emit('error', {
        data: 'Error creating the folder',
      });
    }
  });

  socket.on('deleteFolder', async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
      socket.emit('deleteFolderSuccess', {
        data: 'Folder was deleted successfully',
      });
    } catch (error) {
      console.log('Error in deleting the folder: ', error);
      socket.emit('error', {
        data: 'Error in deleting the folder',
      });
    }
  });

  // TODO: Write an event to support renaming the file
}
