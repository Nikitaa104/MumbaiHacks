import { Schema, model, type Document, type Model, type Types } from 'mongoose';

export interface IScanResult extends Document {
  user: Types.ObjectId;
  title: string;
  type: 'text' | 'email' | 'image' | 'website';
  status: 'pending' | 'completed' | 'failed';
  inputSummary: string;
  findings: Array<{
    riskLevel: 'low' | 'medium' | 'high';
    description: string;
    recommendation: string;
  }>;
  tags: string[];
  score: number;
}

const scanResultSchema = new Schema<IScanResult>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'email', 'image', 'website'],
      default: 'text'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    inputSummary: { type: String },
    findings: [
      {
        riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
        description: String,
        recommendation: String
      }
    ],
    tags: [{ type: String }],
    score: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const ScanResult: Model<IScanResult> = model<IScanResult>(
  'ScanResult',
  scanResultSchema
);

