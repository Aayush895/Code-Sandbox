export function handleTerminalCreation(container, socket) {
  container.exec(
    {
      Cmd: ['/bin/bash'],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      User: 'sandbox',
    },
    (err, exec) => {
      if (err) {
        console.log('Error while creating exec: ', err);
        return;
      }

      exec.start(
        {
          hijack: true,
        },
        (err, stream) => {
          if (err) {
            console.log('Error while starting exec: ', err);
            return;
          }
          // Step1: Stream processing
          processStreamOutput(stream, socket);

          // Step2: Stream writing
          socket.on('message', (data) => {
            stream.write(data);
          });
        },
      );
    },
  );
}

function processStreamOutput(stream, socket) {
  let nextDataType = null; // stores the type of next message
  let nextDataLength = null; // stores the length of the next message
  let buffer = Buffer.from('');

  function processStreamData(data) {
    // This is a helper function to process incoming data chunks
    if (data) {
      buffer = Buffer.concat([buffer, data]); // concatenating incoming data to buffer
    }

    if (!nextDataType) {
      // If the next data type is not known, then we need to read the next 8 bvytes to determine the type & length of the message
      if (buffer.length >= 8) {
        const header = bufferSlicer(8);
        nextDataType = header.readUInt32BE(0); // The first 4 bytes represent the type of the message
        nextDataLength = header.readUInt32BE(4); // The next 4 bytes represent the length of the message

        processStreamData(); // Recursively call the function to process the message
      }
    } else {
      if (buffer.length >= nextDataLength) {
        const content = bufferSlicer(nextDataLength); // Slice the buffer to get the message content
        socket.send(content); // Send the message to the client
        nextDataType = null; // Reset the type of the next message
        nextDataLength = null; // Reset the length of the next message
        processStreamData(); // Recursively call the function to process the message
      }
    }
  }

  function bufferSlicer(end) {
    // This function slices the buffer and returns the sliced buffer and the remaining buffer
    const output = buffer.slice(0, end); // Header of the chunk
    buffer = Buffer.from(buffer.slice(end, buffer.length)); // Remaining part of the chunk

    return output;
  }

  stream.on('data', processStreamData);
}
