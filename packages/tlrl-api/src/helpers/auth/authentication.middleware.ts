import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../../models/user/user';
import { TokenPayload } from '../../types/types';
import { AppError } from '../errors/app_error';

export async function AuthenticationMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next(new AppError('Unauthorized', 401));
  }

  let decoded: TokenPayload;

  try {
    decoded = verify(token!, 'key') as TokenPayload;
  } catch (error) {
    next(new AppError('Authentication Error', 401));
  }

  const user = await User.findOne({ where: { userId: decoded!.user_id } });

  if (!user) {
    next(new AppError('Authentication Error', 401));
  }

  req.user = user!;

  next();
}
