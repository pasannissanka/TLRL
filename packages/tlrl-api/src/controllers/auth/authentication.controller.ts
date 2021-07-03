import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import { User, UserModel } from '../../models/user/user.model';
import { TokenPayload } from '../../types/types';

class AuthenticationController {
  /**
   * registerUser
  req: Requset, res: Response   */
  public async registerUser(req: Request, res: Response) {
    const user = new UserModel({
      email: req.body.email,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });

    try {
      await user.save();
    } catch (error) {
      throw new AppError('Username/ Email Already Exists', 401);
    }

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email } as TokenPayload,
      'key',
      {
        expiresIn: '7d',
      }
    );

    successResponse(res, {
      userId: user._id,
      token: accessToken,
    });
  }

  /**
   * loginUser
  req: Request, res: Response   */
  public async loginUser(req: Request, res: Response) {
    const user = await UserModel.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    }).exec();

    if (!user) {
      throw new AppError('Invalid username or password', 404);
    }

    const isValid = await user.comparePassword(req.body.password);

    if (!isValid) {
      throw new AppError('Invalid username or password', 404);
    }

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email } as TokenPayload,
      'key',
      {
        expiresIn: '7d',
      }
    );

    successResponse(res, {
      userId: user._id,
      token: accessToken,
    });
  }

  /**
   * getUser
  req: Request, res: Response   */
  public async getUser(req: Request, res: Response) {
    const user = req.user as User;
    console.log(user);
    successResponse(res, {
      user: {
        userId: user._id,
        userName: user.userName,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
  }
}

export default new AuthenticationController();
