import { NextFunction, Request, Response } from 'express';
import { AppError } from './app_error';

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err?.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error
  } else {
    console.error('ERROR : ', err);
    res.status(500).json({
      status: 'ERROR',
      message: 'Internal Server Error',
    });
  }
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'ERROR';

  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  } else {
    console.error(err);
    // sendErrorProd(err, res);
    sendErrorDev(err, res);
  }
};
