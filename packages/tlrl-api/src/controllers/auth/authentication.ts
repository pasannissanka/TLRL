import { hash, verify } from 'argon2';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import User from '../../models/user/user';
import { TokenPayload } from '../../types/types';

class AuthenticationController {
  /**
   * registerUser
  req: Requset, res: Response   */
  public async registerUser(req: Request, res: Response) {
    const hashedPassword = await hash(req.body.password);

    let user: User;

    user = await User.create({
      email: req.body.email,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { user_id: user.userId, email: user.email } as TokenPayload,
      'key',
      {
        expiresIn: '7d',
      }
    );

    successResponse(res, {
      userId: user.userId,
      token: accessToken,
    });
  }

  /**
   * loginUser
  req: Request, res: Response   */
  public async loginUser(req: Request, res: Response) {
    const emailOrUsername = req.body.userName
      ? req.body.userName
      : req.body.email;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ userName: emailOrUsername }, { email: emailOrUsername }],
      },
    });

    if (!user) {
      throw new AppError('Invalid username or password', 404);
    }

    const isValid = await verify(user!.password, req.body.password);

    if (!isValid) {
      throw new AppError('Invalid username or password', 404);
    }

    const accessToken = jwt.sign(
      { user_id: user!.userId, email: user!.email } as TokenPayload,
      'key',
      {
        expiresIn: '7d',
      }
    );

    successResponse(res, {
      userId: user.userId,
      token: accessToken,
    });
  }

  /**
   * getUser
  req: Request, res: Response   */
  public async getUser(req: Request, res: Response) {
    const user = req.user as User;
    successResponse(res, {
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
  }
}

export default new AuthenticationController();
