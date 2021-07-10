import { Request, Response } from 'express';
import { successResponse } from '../../helpers/response/success_response';
import { IUser } from '../../models/user/user.model';

class TagController {
  /**
   * getAllTags
   */
  public async getAllTags(req: Request, res: Response) {
    const user = req.user as IUser;

    successResponse(res, { tags: user.tags });
  }
}

export default new TagController();
