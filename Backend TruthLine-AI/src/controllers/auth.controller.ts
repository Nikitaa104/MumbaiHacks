import type { Request, Response } from 'express';
import {
  loginUser,
  refreshAccess,
  registerUser,
  revokeRefreshToken,
  forgotPassword
} from '../services/auth.service';
import { sendResponse } from '../utils/response';
import { asyncHandler } from '../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await registerUser(name, email, password);

  return sendResponse(res, 201, {
    success: true,
    message: 'Registration successful',
    data: {
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email
      },
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      }
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);

  return sendResponse(res, 200, {
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email
      },
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      }
    }
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  const result = await refreshAccess(token);

  return sendResponse(res, 200, {
    success: true,
    message: 'Token refreshed',
    data: {
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      }
    }
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  if (req.user && token) {
    await revokeRefreshToken(req.user.id, token);
  }

  return sendResponse(res, 200, {
    success: true,
    message: 'Logged out'
  });
});

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    await forgotPassword(email);

    return sendResponse(res, 200, {
      success: true,
      message: 'If the account exists, an email will be sent.'
    });
  }
);

