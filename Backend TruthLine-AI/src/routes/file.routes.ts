import { Router } from 'express';
import { uploadFile, listFiles } from '../controllers/file.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { uploader } from '../middlewares/upload.middleware';

const router = Router();

router.get('/', authenticate(), listFiles);
router.post(
  '/',
  authenticate(),
  uploader.single('file'),
  uploadFile
);

export default router;

