import { Schema, model, type Document, type Model, type Types } from 'mongoose';

export interface ISpamCheck extends Document {
  user: Types.ObjectId;
  contentSample: string;
  riskScore: number;
  verdict: 'spam' | 'suspicious' | 'clean';
  metadata: Record<string, unknown>;
}

const spamCheckSchema = new Schema<ISpamCheck>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contentSample: { type: String, required: true },
    riskScore: { type: Number, default: 0 },
    verdict: {
      type: String,
      enum: ['spam', 'suspicious', 'clean'],
      default: 'clean'
    },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

export const SpamCheck: Model<ISpamCheck> = model<ISpamCheck>(
  'SpamCheck',
  spamCheckSchema
);

