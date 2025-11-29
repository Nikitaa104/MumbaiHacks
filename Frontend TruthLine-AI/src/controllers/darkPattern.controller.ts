import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/response.js';
import { detectDarkPatterns } from '../services/ai.service.js';

export const detectDarkPatternsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { content } = req.body;
    if (!content || typeof content !== 'string') {
      return sendResponse(res, 400, {
        success: false,
        message: 'Content is required'
      });
    }

    const analysis = await detectDarkPatterns(content);
    return sendResponse(res, 200, {
      success: true,
      data: analysis
    });
  }
);

