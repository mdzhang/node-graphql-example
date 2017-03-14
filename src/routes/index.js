import { Router } from 'express';
import config from 'config';

const router = Router();

router.get('/crashme', (req, res, next) => {
  // Express will handle synchronous crashing
  process.nextTick(() => {
    next(new Error('Crashed!'));
  });
});

router.get('/version', (req, res) => {
  res.send(config.get('version'));
});

export default router;
