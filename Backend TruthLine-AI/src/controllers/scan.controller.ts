import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendResponse } from '../utils/response';
import {
  createScanResult,
  deleteScanResult,
  getScanHistory,
  updateScanResult
} from '../services/scan.service';
import { process as processAnalysis } from '../services/analyze.service';

export const analyzeTextController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Unauthorized'
      });
    }

    const { payload, title, type = 'text' } = req.body;
    if (!payload || typeof payload !== 'string') {
      return sendResponse(res, 400, {
        success: false,
        message: 'Payload is required'
      });
    }
    const orchestrated = await processAnalysis(payload);

    const scan = await createScanResult(req.user.id, {
      title: title ?? 'Untitled Scan',
      type,
      inputSummary: payload.slice(0, 150),
      findings: [],
      score: orchestrated.report.riskScore,
      tags: [orchestrated.report.overallLabel]
    });

    return sendResponse(res, 200, {
      success: true,
      message: 'Analysis completed',
      data: { scan, orchestrated }
    });
  }
);

export const listScanHistory = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Unauthorized'
      });
    }

    const scans = await getScanHistory(req.user.id);
    return sendResponse(res, 200, {
      success: true,
      data: scans
    });
  }
);

export const editScan = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, {
      success: false,
      message: 'Unauthorized'
    });
  }

  const updated = await updateScanResult(req.user.id, req.params.id, req.body);

  return sendResponse(res, 200, {
    success: true,
    data: updated
  });
});

export const removeScan = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, {
      success: false,
      message: 'Unauthorized'
    });
  }

  await deleteScanResult(req.user.id, req.params.id);

  return sendResponse(res, 200, {
    success: true,
    message: 'Scan deleted'
  });
});

