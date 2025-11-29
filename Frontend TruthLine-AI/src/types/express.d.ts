import type { IUser } from '../models/user.model.js';

declare global {
  namespace Express {
    interface UserSafe {
      id: string;
      email: string;
      role: IUser['role'];
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user?: UserSafe;
    }
  }
}

export {};

