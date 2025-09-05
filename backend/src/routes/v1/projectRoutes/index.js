import express from 'express';
import { createProject } from '../../../controller/projectController.js';

const router = express.Router();

router.get('/project', createProject);

export default router;
