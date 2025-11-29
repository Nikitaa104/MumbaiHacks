import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/response.js';
import { getProfile, updateProfile, getDashboardData } from '../services/user.service.js';

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, { success: false, message: 'Unauthorized' });
  }

  const profile = await getProfile(req.user.id);
  return sendResponse(res, 200, { success: true, data: profile });
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, { success: false, message: 'Unauthorized' });
  }

  const updated = await updateProfile(req.user.id, req.body);
  return sendResponse(res, 200, { success: true, data: updated });
});

export const dashboard = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, { success: false, message: 'Unauthorized' });
  }

  const data = await getDashboardData(req.user.id);
  return sendResponse(res, 200, { success: true, data });
});

