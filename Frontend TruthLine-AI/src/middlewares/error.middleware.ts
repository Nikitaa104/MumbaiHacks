import type { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/response.js';

interface AppError extends Error {
  statusCode?: number;
  details?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  const status = err.statusCode ?? 500;
  const message =
    status === 500 ? 'Internal server error' : err.message || 'Error';

  return sendResponse(res, status, {
    success: false,
    message,
    meta: err.details ? { details: err.details } : undefined
  });
};

