export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'FAILURE' : 'ERROR';
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
