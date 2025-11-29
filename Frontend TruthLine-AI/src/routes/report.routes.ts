import { Router } from 'express';
import { generateReportController } from '../controllers/report.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticate(true), generateReportController);

export default router;


