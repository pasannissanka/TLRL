import { Request, Response } from 'express';
import { successResponse } from '../../helpers/response/success_response';
import groupBy from 'lodash.groupby';
import User from '../../models/user/user.model';
import Bookmark from '../../models/bookmark/bookmark.model';
import { AppError } from '../../helpers/errors/app_error';

class CategoryController {
  /**
   * getAllCategories
   */
  public async getAllCategories(req: Request, res: Response) {
    const user = req.user as User;
    const include = req.query.include === 'bookmark' ? [Bookmark] : [];

    const allCategories = await user.getCategory({ include: include });

    const grouped = groupBy(allCategories, (category) => {
      return category.parentCategoryId;
    });

    // This works for one level deep only, @todo implement recursivly
    // In begining we support only one level deep category level only! :D
    const a = grouped['null']?.map((node) => {
      return {
        ...node.get(),
        children: grouped[node.categoryId],
      };
    });

    successResponse(res, a);
  }

  /**
   * createCategory
   */
  public async createCategory(req: Request, res: Response) {
    const user = req.user as User;
    const parentCategoryId = req.body.parent ? req.body.parent : undefined;

    const category = await user.createCategory({
      name: req.body.name,
      userId: user.userId,
      parentCategoryId: parentCategoryId,
    });

    successResponse(res, {
      category,
    });
  }

  /**
   * getCategory
   */
  public async getCategory(req: Request, res: Response) {
    const user = req.user as User;

    const category = await user.getCategory({
      where: { categoryId: req.params.categoryId },
      include: [Bookmark],
    });
    successResponse(res, { category });
  }

  /**
   * editCategory
   */
  public async editCategory(_: Request, res: Response) {
    successResponse(res, {}, 500, 'NOT IMPLEMENTED');
  }

  /**
   * addBookmarkToCategory
   */
  public async addBookmarkToCategory(req: Request, res: Response) {
    // This executes 4+ queries, @todo refactor later

    const user = req.user as User;
    const bookmark = await user.getBookmarks({
      where: { bookmarkId: req.query.bookmarkId },
    });

    const category = await user.getCategory({
      where: { categoryId: req.params.categoryId },
    });

    if (!bookmark || bookmark.length === 0) {
      throw new AppError('Bookmark not found', 404);
    }

    if (!category || category.length === 0) {
      throw new AppError('Category not found', 404);
    }

    await bookmark[0].addCategory(category[0]);

    const categoryUpdated = await user.getCategory({
      where: { categoryId: req.params.categoryId },
      include: [Bookmark],
    });

    successResponse(res, { category: categoryUpdated });
  }

  /**
   * removeBookmarkFromCategory
   */
  public async removeBookmarkFromCategory(req: Request, res: Response) {
    const user = req.user as User;
    const bookmark = await user.getBookmarks({
      where: { bookmarkId: req.query.bookmarkId },
    });

    const category = await user.getCategory({
      where: { categoryId: req.params.categoryId },
    });

    if (!bookmark || bookmark.length === 0) {
      throw new AppError('Bookmark not found', 404);
    }

    if (!category || category.length === 0) {
      throw new AppError('Category not found', 404);
    }

    await bookmark[0].removeCategory(category[0]);

    const categoryUpdated = await user.getCategory({
      where: { categoryId: req.params.categoryId },
      include: [Bookmark],
    });
    successResponse(res, { category: categoryUpdated });
  }

  /**
   * deleteCategory
   */
  public async deleteCategory(_: Request, res: Response) {
    successResponse(res, {}, 500, 'NOT IMPLEMENTED');
  }

  /**
   * moveBookmarkCategory
   */
  public async moveBookmarkCategory(_: Request, res: Response) {
    successResponse(res, {}, 500, 'NOT IMPLEMENTED');
  }
}

export default new CategoryController();
