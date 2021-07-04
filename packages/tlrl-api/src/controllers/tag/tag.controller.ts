import { Request, Response } from 'express';

class TagController {
  /**
   * getAllTags
   */
  public async getAllTags(_: Request, res: Response) {
    res.json({ message: 'NOT IMPLEMENTED' });
  }
}

export default new TagController();
