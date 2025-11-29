import { Router } from 'express';
import {
  listScanHistory,
  editScan,
  removeScan
} from '../controllers/scan.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate(), listScanHistory);
router.patch('/:id', authenticate(), editScan);
router.delete('/:id', authenticate(), removeScan);

export default router;

