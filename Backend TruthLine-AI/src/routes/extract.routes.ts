import { Router } from 'express';
import { extractController } from '../controllers/extract.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(true), extractController);

export default router;


