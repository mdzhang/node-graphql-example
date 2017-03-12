import { Router } from 'express';
import { version } from '../../../package.json';

const router = Router();

router.get('/', (req, res) => {
  res.send(version);
});

router.get('/crashme', (req, res, next) => {
  // Express will handle synchronous crashing
  process.nextTick(() => {
    next(new Error('Crashed!'));
  });
});

export default router;
