export const httpError = (message: string, statusCode: number): never => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  throw error;
};

