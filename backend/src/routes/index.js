import express from 'express';
import pingRoute from './v1/pingRoutes/index.js';

const router = express.Router();
router.use('/v1', pingRoute);

export default router;
