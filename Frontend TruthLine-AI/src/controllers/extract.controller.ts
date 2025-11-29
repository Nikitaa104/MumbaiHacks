import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/response.js';
import { runExtractionAgent } from '../agents/extractionAgent.js';

export const extractController = asyncHandler(
  async (req: Request, res: Response) => {
    const { content } = req.body;
    if (!content || typeof content !== 'string') {
      return sendResponse(res, 400, {
        success: false,
        message: 'Content is required'
      });
    }

    const extraction = await runExtractionAgent(content);
    return sendResponse(res, 200, {
      success: true,
      data: extraction
    });
  }
);


