
import type { IUser } from '../models/user.model';
import { User } from '../models/user.model';
import { ActivityLog } from '../models/activityLog.model';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token';
import { httpError } from '../utils/httpError';

interface AuthPayload {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

// Custom error class with statusCode
class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthPayload> => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError('Email already registered', 400);
  }

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed });

  return issueTokens(user);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthPayload> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  user.lastLoginAt = new Date();
  await user.save();

  await ActivityLog.create({ user: user._id, action: 'login', details: { email } });

  return issueTokens(user);
};

export const refreshAccess = async (token: string): Promise<AuthPayload> => {
  const payload = verifyRefreshToken(token);
  const user = await User.findById(payload.sub);

  if (!user || !user.refreshTokens.includes(token)) {
    throw new ApiError('Invalid refresh token', 401);
  }

  return issueTokens(user);
};

export const revokeRefreshToken = async (userId: string, token: string): Promise<void> => {
  await User.findByIdAndUpdate(userId, { $pull: { refreshTokens: token } });
};

export const forgotPassword = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) return;

  await ActivityLog.create({ user: user._id, action: 'forgot_password_requested', details: { email } });
};

const issueTokens = async (user: IUser): Promise<AuthPayload> => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user, accessToken, refreshToken };
};
