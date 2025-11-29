import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

interface EnvConfig {
  nodeEnv: string;
  isProd: boolean;
  isTest: boolean;
  port: number;
  mongoUri: string;
  clientUrl: string;
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessExpiresIn: string;
    refreshExpiresIn: string;
  };
}

const getEnv = (): EnvConfig => {
  const required = [
    'MONGO_URI',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'CLIENT_URL'
  ];

  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    isProd: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    port: Number(process.env.PORT) || 5000,
    mongoUri: process.env.MONGO_URI as string,
    clientUrl: process.env.CLIENT_URL as string,
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET as string,
      refreshSecret: process.env.JWT_REFRESH_SECRET as string,
      accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m',
      refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d'
    }
  };
};

export const env = getEnv();

