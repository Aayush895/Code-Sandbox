import express from 'express';
import {
  createProject,
  getProjectDirectoryTree,
} from '../../../controller/projectController.js';

const router = express.Router();

router.post('/project', createProject);
router.get('/project/:projectId', getProjectDirectoryTree);

export default router;
