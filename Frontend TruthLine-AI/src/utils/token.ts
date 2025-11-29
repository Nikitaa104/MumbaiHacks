import jwt from 'jsonwebtoken';
import type { IUser } from '../models/user.model.js';
import { env } from '../config/env.js';

export interface TokenPayload {
  sub: string;
  email: string;
  role: IUser['role'];
}

export const generateAccessToken = (user: IUser): string => {
  const payload: TokenPayload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn
  });
};

export const generateRefreshToken = (user: IUser): string => {
  const payload: TokenPayload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn
  });
};

export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, env.jwt.accessSecret) as TokenPayload;

export const verifyRefreshToken = (token: string): TokenPayload =>
  jwt.verify(token, env.jwt.refreshSecret) as TokenPayload;

