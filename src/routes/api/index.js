import { Router } from 'express';
import { version } from '../../../package.json';

const router = Router();

router.get('/', (req, res) => {
  res.send(version);
});

export default router;
