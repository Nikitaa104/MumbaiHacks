import { User } from '../models/user.model.js';
import { ActivityLog } from '../models/activityLog.model.js';
import { getRecentScans } from './scan.service.js';

export const getProfile = async (userId: string) => {
  return User.findById(userId).select('-password -refreshTokens');
};

export const updateProfile = async (
  userId: string,
  payload: { name?: string; preferences?: Record<string, unknown> }
) => {
  const updated = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true }
  ).select('-password -refreshTokens');

  if (updated) {
    await ActivityLog.create({
      user: updated._id,
      action: 'profile_updated',
      details: payload
    });
  }

  return updated;
};

export const getDashboardData = async (userId: string) => {
  const [recentScans, activityCount] = await Promise.all([
    getRecentScans(userId),
    ActivityLog.countDocuments({ user: userId })
  ]);

  return {
    recentScans,
    activityCount
  };
};

