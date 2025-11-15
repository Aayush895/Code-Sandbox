import Docker from 'dockerode';

const docker = new Docker();

export const handleContainerCreate = async (projectId, socket) => {
  try {
    console.log('Project id received for container creation: ', projectId);
    const container = await docker.createContainer({
      Image: 'sandbox', // name given by us for the written dockerfile
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ['/bin/bash'],
      Tty: true,
      User: 'sandbox',
      // HostConfig is responsible for attaching the host machine or server machine with docker container when container is created
      HostConfig: {
        Binds: [
          // Mounting the project directory to the container
          `${process.cwd()}/projects/${projectId}:/home/sandbox/app`,
        ],
        PortBindings: {
          '5173/tcp': [
            {
              HostPort: '0', // random port will be assigned by docker
            },
          ],
        },
        ExposedPorts: {
          '5173/tcp': {},
        },
        Env: ['Host=0.0.0.0'],
      },
    });

    console.log('Docker container created: ', container.id);
    await container.start();
    console.log('Docker container started successfully');

    container.exec(
      {
        Cmd: ['/bin/bash'],
        User: 'sandbox',
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
      },
      (err, exec) => {
        if (err) {
          console.log('Error while creating exec', err);
          return;
        }

        exec.start({ hijack: true }, (err, stream) => {
          if (err) {
            console.log('Error while starting exec', err);
            return;
          }
          processStream(stream, socket);
          socket.on('shell-input', (data) => {
            stream.write('pwd\n', (err) => {
              if (err) {
                console.log('Error while writing to stream: ', err);
              }
            });
          });
        });
      },
    );
  } catch (error) {
    console.log('Error while creating the docker container: ', error);
  }
};

function processStream(stream, socket) {
  let buffer = Buffer.from('');
  stream.on('data', (data) => {
    buffer = Buffer.concat([buffer, data]);
    socket.emit('shell-output', buffer.toString());
    buffer = Buffer.from('');
  });

  stream.on('end', () => {
    console.log('Stream ended');
    socket.emit('shell-output', 'Stream ended');
  });

  stream.on('error', (err) => {
    console.log('Stream error', err);
    socket.emit('shell-output', 'Stream err');
  });
}
