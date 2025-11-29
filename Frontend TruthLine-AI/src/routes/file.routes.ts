import { Router } from 'express';
import { uploadFile, listFiles } from '../controllers/file.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uploader } from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', authenticate(), listFiles);
router.post(
  '/',
  authenticate(),
  uploader.single('file'),
  uploadFile
);

export default router;

