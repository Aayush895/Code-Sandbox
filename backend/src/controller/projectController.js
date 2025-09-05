import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

// takes the function `child_process.exec` and returns a promise of that function
const execPromise = promisify(exec);

export async function createProject(req, res) {
  try {
    const projectId = uuidv4();

    await fs.mkdir(`./projects/${projectId}`);
    await execPromise(`npm create vite@latest sandbox -- --template react`, {
      cwd: `./projects/${projectId}`,
    });

    return res.send({
      message: 'Project was created successfully',
      data: `Project ID that was created is: ${projectId}`,
    });
  } catch (error) {
    console.log('Error creating the project: ', error);
    throw error;
  }
}
