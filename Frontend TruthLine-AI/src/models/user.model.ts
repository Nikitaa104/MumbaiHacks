import { Schema, model, type Document, type Model } from 'mongoose';

export type UserRole = 'user' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    language: string;
  };
  lastLoginAt?: Date;
  refreshTokens: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    preferences: {
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      notifications: { type: Boolean, default: true },
      language: { type: String, default: 'en' }
    },
    lastLoginAt: { type: Date },
    refreshTokens: { type: [String], default: [] }
  },
  { timestamps: true }
);

export const User: Model<IUser> = model<IUser>('User', userSchema);

