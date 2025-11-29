import type { Request, Response } from 'express';
import { sendResponse } from '../utils/response.js';

export const notFoundHandler = (req: Request, res: Response): Response => {
  return sendResponse(res, 404, {
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

