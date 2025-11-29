import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/response.js';
import { getProfile, updateProfile } from '../services/user.service.js';

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, { success: false, message: 'Unauthorized' });
  }

  const profile = await getProfile(req.user.id);
  return sendResponse(res, 200, {
    success: true,
    data: {
      preferences: profile?.preferences,
      name: profile?.name,
      email: profile?.email
    }
  });
});

export const updateSettings = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Unauthorized'
      });
    }

    const updated = await updateProfile(req.user.id, req.body);
    return sendResponse(res, 200, {
      success: true,
      message: 'Settings updated',
      data: updated
    });
  }
);

