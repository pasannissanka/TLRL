import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from './app_error';

export const catchValidationErrors = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    next(new AppError(`Validation Error`, 401));
  }
  next();
};
