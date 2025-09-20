import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import path from 'path';
import directoryTree from 'directory-tree';

// takes the function `child_process.exec` and returns a promise of that function
const execPromise = promisify(exec);

export async function createProjectService() {
  try {
    const projectId = uuidv4();

    await fs.mkdir(`./projects/${projectId}`);
    await execPromise(REACT_PROJECT_COMMAND, {
      cwd: `./projects/${projectId}`,
    });

    return projectId;
  } catch (error) {
    console.log('Error creating the project: ', error);
    throw error;
  }
}

export async function getProjectDirectoryTreeService(projectId) {
  try {
    const projectPath = path.resolve(`./projects/${projectId}`);
    const projectTree = directoryTree(projectPath);
    return projectTree;
  } catch (error) {
    console.log('Error in generating the project tree: ', error);
    throw error;
  }
}
