import { Schema, model, type Document, type Model, type Types } from 'mongoose';

export interface IActivityLog extends Document {
  user: Types.ObjectId;
  action: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    details: { type: Object, default: {} },
    ipAddress: { type: String }
  },
  { timestamps: true }
);

export const ActivityLog: Model<IActivityLog> = model<IActivityLog>(
  'ActivityLog',
  activityLogSchema
);

