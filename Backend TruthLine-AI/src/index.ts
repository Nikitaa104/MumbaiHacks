import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectToDatabase } from './config/database';
import { corsOptions } from './config/corsOptions';
import { env } from './config/env';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { requestLogger } from './middlewares/requestLogger.middleware';
import router from './routes/index';
const app: Application = express();

// Core middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(requestLogger);
app.use(
  morgan(env.isProd ? 'combined' : 'dev', {
    skip: () => env.isTest
  })
);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'TruthLine_AI API' });
});

app.use('/api', router);

// Simple root route
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running!'
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await connectToDatabase();

    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 TruthLine_AI API running on port ${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

void start();

