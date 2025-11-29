import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/response.js';
import { saveFileMetadata, listUserFiles } from '../services/file.service.js';

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, {
      success: false,
      message: 'Unauthorized'
    });
  }

  if (!req.file) {
    return sendResponse(res, 400, {
      success: false,
      message: 'No file provided'
    });
  }

  const record = await saveFileMetadata(req.user.id, req.file, req.body.usage);

  return sendResponse(res, 201, {
    success: true,
    message: 'File uploaded',
    data: record
  });
});

export const listFiles = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, {
      success: false,
      message: 'Unauthorized'
    });
  }

  const files = await listUserFiles(req.user.id);

  return sendResponse(res, 200, {
    success: true,
    data: files
  });
});

