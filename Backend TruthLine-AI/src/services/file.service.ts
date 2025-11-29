import path from 'node:path';
import { FileUpload } from '../models/fileUpload.model';

export const saveFileMetadata = async (
  userId: string,
  file: Express.Multer.File,
  usage: 'analysis' | 'spam' | 'report' = 'analysis'
) => {
  return FileUpload.create({
    user: userId,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    storagePath: normalizePath(file.path),
    usage,
    status: 'uploaded'
  });
};

export const listUserFiles = async (userId: string) =>
  FileUpload.find({ user: userId }).sort({ createdAt: -1 });

const normalizePath = (filePath: string): string =>
  filePath.split(path.sep).join('/');

