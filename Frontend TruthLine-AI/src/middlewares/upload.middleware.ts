import multer from 'multer';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve('uploads'));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  }
});

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  const allowed = [
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg'
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'));
  }
};

export const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }
});

