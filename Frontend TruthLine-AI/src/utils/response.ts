import type { Response } from 'express';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  payload: ApiResponse<T>
): Response => {
  return res.status(statusCode).json({
    success: payload.success,
    message: payload.message,
    data: payload.data,
    meta: payload.meta
  });
};

