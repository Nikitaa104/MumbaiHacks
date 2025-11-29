import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendResponse } from '../utils/response';
import { runReportAgent } from '../agents/reportAgent';
import type { ClassificationResult, ExtractionResult, SummaryResult } from '../agents/types';

export const generateReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const { classification, extraction, summary } = req.body as {
      classification: ClassificationResult;
      extraction: ExtractionResult;
      summary: SummaryResult;
    };

    if (!classification || !extraction || !summary) {
      return sendResponse(res, 400, {
        success: false,
        message: 'classification, extraction and summary are required'
      });
    }

    const report = await runReportAgent({ classification, extraction, summary });
    return sendResponse(res, 200, {
      success: true,
      data: report
    });
  }
);


