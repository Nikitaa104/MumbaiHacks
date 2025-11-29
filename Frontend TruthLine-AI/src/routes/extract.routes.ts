import { Router } from 'express';
import { extractController } from '../controllers/extract.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticate(true), extractController);

export default router;


