import express from 'express';
import pingRoute from './v1/pingRoutes/index.js';
import projectRoutes from './v1/projectRoutes/index.js';

const router = express.Router();

router.use('/v1', pingRoute);
router.use('/v1', projectRoutes);

export default router;
