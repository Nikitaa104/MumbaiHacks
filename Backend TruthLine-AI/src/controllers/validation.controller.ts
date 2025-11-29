import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendResponse } from '../utils/response';
import { validateEmail } from '../services/validation.service';

export const validateEmailController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return sendResponse(res, 400, {
        success: false,
        message: 'Email is required'
      });
    }

    const result = await validateEmail(email);
    return sendResponse(res, 200, {
      success: true,
      data: result
    });
  }
);

