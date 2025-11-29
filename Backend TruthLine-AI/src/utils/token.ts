import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { env } from '../config/env';

// Access token expires in 15 minutes
export const generateAccessToken = (user: IUser): string => {
  const payload = { sub: user._id.toString() };
  const options: SignOptions = { expiresIn: '15m' };
  return jwt.sign(payload, env.jwt.accessSecret as string, options);
};

// Refresh token expires in 7 days
export const generateRefreshToken = (user: IUser): string => {
  const payload = { sub: user._id.toString() };
  const options: SignOptions = { expiresIn: '7d' };
  return jwt.sign(payload, env.jwt.refreshSecret as string, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.jwt.accessSecret as string) as JwtPayload;
  } catch (err) {
    throw new Error('Invalid access token');
  }
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.jwt.refreshSecret as string) as JwtPayload;
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};

