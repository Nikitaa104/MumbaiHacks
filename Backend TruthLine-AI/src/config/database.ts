import mongoose from 'mongoose';
import { env } from './env';

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  try {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(env.mongoUri);
    // eslint-disable-next-line no-console
    console.log('✅ Connected to MongoDB');
    return connection;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ MongoDB connection error', error);
    throw error;
  }
};

