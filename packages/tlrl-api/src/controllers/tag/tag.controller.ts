import { Request, Response } from 'express';
import { successResponse } from '../../helpers/response/success_response';
import User from '../../models/user/user.model.sql';

class TagController {
  /**
   * getAllTags
   */
  public async getAllTags(req: Request, res: Response) {
    // const user = req.user as User;
    // const tags = await user.getTags();
    // successResponse(res, {
    //   tags,
    // });
    res.json({ message: 'NOT IMPLEMENTED' });
  }
}

export default new TagController();
