import { hash, verify } from 'argon2';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../../models/user/user';

class AuthenticationController {
  /**
   * registerUser
  req: Requset, res: Response   */
  public async registerUser(req: Request, res: Response) {
    const hasedPassword = await hash(req.body.password);

    let user: User;

    user = await User.create({
      email: req.body.email,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hasedPassword,
    });

    const accessToken = jwt.sign(
      { user_id: user.userId, email: user.email },
      'key',
      {
        expiresIn: '7d',
      }
    );

    res.status(200).send({
      message: 'Successful',
      userId: user.userId,
      token: accessToken,
    });
  }

  /**
   * loginUser
  req: Request, res: Response   */
  public async loginUser(req: Request, res: Response) {
    console.log(req.body);
    const emailOrUsername = req.body.userName
      ? req.body.userName
      : req.body.email;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ userName: emailOrUsername }, { email: emailOrUsername }],
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = verify(user!.password, req.body.password);

    if (!isValid) {
      throw new Error('Invalid Password');
    }

    const accessToken = jwt.sign(
      { user_id: user!.userId, email: user!.email },
      'key',
      {
        expiresIn: '7d',
      }
    );

    res.status(200).send({
      message: 'Successful',
      userId: user!.userId,
      token: accessToken,
    });
  }

  /**
   * getUser
  req: Request, res: Response   */
  public async getUser(req: Request, res: Response) {
    res.status(200).send('NOT IMPLEMENTED1');
  }
}

export default new AuthenticationController();
