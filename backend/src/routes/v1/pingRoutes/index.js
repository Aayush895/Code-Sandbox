import express from 'express';

const router = express.Router();

router.get('/ping', (_, res) => {
  res.send({
    message: 'PONG',
  });
});

export default router;
