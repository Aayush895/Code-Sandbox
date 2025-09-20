import {
  createProjectService,
  getProjectDirectoryTreeService,
} from '../services/projectService.js';

export async function createProject(req, res) {
  try {
    const projectId = await createProjectService();

    return res.send({
      message: 'Project was created successfully',
      projectId,
    });
  } catch (error) {
    console.log('Error in controller layer of createProject func: ', error);
    throw error;
  }
}

export async function getProjectDirectoryTree(req, res) {
  try {
    const { projectId } = req.params;
    const tree = await getProjectDirectoryTreeService(projectId);

    return res.send({
      success: true,
      data: tree,
      message: 'Project directory tree was successfully created',
    });
  } catch (error) {
    console.log(
      'Error in controller layer of getProjectDirectoryTree func: ',
      error,
    );
    throw error;
  }
}
