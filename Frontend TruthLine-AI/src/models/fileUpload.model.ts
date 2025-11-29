import { Schema, model, type Document, type Model, type Types } from 'mongoose';

export interface IFileUpload extends Document {
  user: Types.ObjectId;
  originalName: string;
  mimeType: string;
  size: number;
  storagePath: string;
  usage: 'analysis' | 'spam' | 'report';
  status: 'uploaded' | 'processed' | 'deleted';
}

const fileUploadSchema = new Schema<IFileUpload>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    storagePath: { type: String, required: true },
    usage: {
      type: String,
      enum: ['analysis', 'spam', 'report'],
      default: 'analysis'
    },
    status: {
      type: String,
      enum: ['uploaded', 'processed', 'deleted'],
      default: 'uploaded'
    }
  },
  { timestamps: true }
);

export const FileUpload: Model<IFileUpload> = model<IFileUpload>(
  'FileUpload',
  fileUploadSchema
);

