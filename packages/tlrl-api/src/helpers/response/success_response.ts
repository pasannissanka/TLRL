import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any,
  statusCode = 200,
  message = 'SUCCESS'
) => {
  res.status(statusCode).send({
    message,
    data,
  });
};
