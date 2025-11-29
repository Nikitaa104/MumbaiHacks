import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendResponse } from '../utils/response';
import { performSpamCheck } from '../services/spam.service';

export const spamDetectController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Unauthorized'
      });
    }

    const { content, metadata } = req.body;
    if (!content || typeof content !== 'string') {
      return sendResponse(res, 400, {
        success: false,
        message: 'Content is required'
      });
    }
    const spamCheck = await performSpamCheck(req.user.id, { content, metadata });

    return sendResponse(res, 200, {
      success: true,
      message: 'Spam detection completed',
      data: spamCheck
    });
  }
);

