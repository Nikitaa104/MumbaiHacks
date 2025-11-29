import type { IUser } from '../models/user.model.js';
import { User } from '../models/user.model.js';
import { ActivityLog } from '../models/activityLog.model.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../utils/token.js';
import { httpError } from '../utils/httpError.js';

interface AuthPayload {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthPayload> => {
  const existing = await User.findOne({ email });
  if (existing) {
    httpError('Email already registered', 400);
  }

  const hashed = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return issueTokens(user);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthPayload> => {
  const user = await User.findOne({ email });
  if (!user) {
    httpError('Invalid credentials', 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  user.lastLoginAt = new Date();
  await user.save();

  await ActivityLog.create({
    user: user._id,
    action: 'login',
    details: { email }
  });

  return issueTokens(user);
};

export const refreshAccess = async (token: string): Promise<AuthPayload> => {
  const payload = verifyRefreshToken(token);
  const user = await User.findById(payload.sub);

  if (!user || !user.refreshTokens.includes(token)) {
    httpError('Invalid refresh token', 401);
  }

  return issueTokens(user);
};

export const revokeRefreshToken = async (
  userId: string,
  token: string
): Promise<void> => {
  await User.findByIdAndUpdate(userId, {
    $pull: { refreshTokens: token }
  });
};

export const forgotPassword = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) {
    return;
  }

  await ActivityLog.create({
    user: user._id,
    action: 'forgot_password_requested',
    details: { email }
  });
};

const issueTokens = async (user: IUser): Promise<AuthPayload> => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user, accessToken, refreshToken };
};

