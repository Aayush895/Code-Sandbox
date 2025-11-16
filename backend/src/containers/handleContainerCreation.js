import Docker from 'dockerode';

const docker = new Docker();

export const handleContainerCreate = async (
  projectId,
  terminalWebSocket,
  req,
  tcpSocket,
  head,
) => {
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
      Volumes: {
        '/home/sandbox/app': {}
      },
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
      },
      ExposedPorts: {
        '5173/tcp': {},
      },
      Env: ['Host=0.0.0.0'],
    });

    console.log('Docker container created: ', container.id);
    await container.start();
    console.log('Docker container started successfully');

    // Upgrading the connection from http to socket connection once the docker container has been created
    terminalWebSocket.handleUpgrade(
      req,
      tcpSocket,
      head,
      (establishedWSConn) => {
        terminalWebSocket.emit('connection', establishedWSConn, req, container);
      },
    );
  } catch (error) {
    console.log('Error while creating the docker container: ', error);
  }
};
