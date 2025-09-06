import express from 'express';

const router = express.Router();

router.get('/ping', (_, res) => {
  return res.json({
    message: 'PONG',
  });
});

export default router;
