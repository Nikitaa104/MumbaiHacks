import { Router } from 'express';
import { generateReportController } from '../controllers/report.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(true), generateReportController);

export default router;


