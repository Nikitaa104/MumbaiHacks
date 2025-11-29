import { ScanResult } from '../models/scanResult.model.js';
import { ActivityLog } from '../models/activityLog.model.js';

interface ScanPayload {
  title: string;
  type: 'text' | 'email' | 'image' | 'website';
  inputSummary: string;
  findings?: Array<{
    riskLevel: 'low' | 'medium' | 'high';
    description: string;
    recommendation: string;
  }>;
  tags?: string[];
  score?: number;
}

export const createScanResult = async (
  userId: string,
  payload: ScanPayload
) => {
  const scan = await ScanResult.create({
    user: userId,
    status: 'completed',
    ...payload
  });

  await ActivityLog.create({
    user: userId,
    action: 'scan_created',
    details: { scanId: scan._id }
  });

  return scan;
};

export const getScanHistory = async (userId: string, limit = 50) => {
  return ScanResult.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const updateScanResult = async (
  userId: string,
  scanId: string,
  update: Partial<ScanPayload>
) => {
  return ScanResult.findOneAndUpdate(
    { _id: scanId, user: userId },
    { $set: update },
    { new: true }
  );
};

export const deleteScanResult = async (
  userId: string,
  scanId: string
) => {
  return ScanResult.findOneAndDelete({ _id: scanId, user: userId });
};

export const getRecentScans = async (userId: string, limit = 5) => {
  return ScanResult.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('title type status score createdAt');
};

