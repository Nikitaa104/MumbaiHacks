import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/token';
import { sendResponse } from '../utils/response';
import { User } from '../models/user.model';

export const authenticate =
  (allowOptional = false) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        if (allowOptional) {
          return next();
        }
        return void sendResponse(res, 401, {
          success: false,
          message: 'Authorization header missing'
        });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return void sendResponse(res, 401, {
          success: false,
          message: 'Invalid authorization header'
        });
      }

      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.sub);

      if (!user) {
        return void sendResponse(res, 401, {
          success: false,
          message: 'User not found'
        });
      }

      req.user = {
        id: user._id.toString(),
        email: user.email,
        role: user.role
      };

      return next();
    } catch (error) {
      return void sendResponse(res, 401, {
        success: false,
        message: 'Unauthorized'
      });
    }
  };

