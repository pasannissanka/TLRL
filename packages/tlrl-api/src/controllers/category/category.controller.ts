import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import { CategoryModel } from '../../models/category/category.model';
import { IUser } from '../../models/user/user.model';
import { categoryAggregateQuery } from './category.aggregate';

class CategoryController {
  /**
   * getAllCategories
   */
  public async getAllCategories(req: Request, res: Response) {
    const user = req.user as IUser;

    const categoryGraph = await CategoryModel.aggregate(
      categoryAggregateQuery(user._id)
    ).exec();

    successResponse(res, {
      categories: categoryGraph,
    });
  }

  /**
   * createCategory
   */
  public async createCategory(req: Request, res: Response) {
    const user = req.user as IUser;

    const reqData = req.body;

    if (user.categories.some((cat) => cat.name === reqData.name)) {
      throw new AppError('Category Already Exists', 401);
    }

    if (reqData.parent) {
      if (
        user.categories.some(
          (cat) => cat._id === Types.ObjectId(reqData.parent)
        )
      ) {
        throw new AppError('Invalid Parent Category', 401);
      }
    }

    const category = new CategoryModel({
      name: reqData.name,
      colorCode: reqData.colorCode,
      userId: user._id,
      parent: Types.ObjectId(reqData.parent),
    });

    await category.save();

    successResponse(res, {
      category,
    });
  }

  /**
   * getCategory
   */
  public async getCategory(req: Request, res: Response) {
    const user = req.user as IUser;

    const category = await CategoryModel.aggregate([
      {
        $match: {
          userId: Types.ObjectId(user._id),
          _id: Types.ObjectId(req.params.categoryId),
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'children',
          foreignField: '_id',
          as: 'children',
        },
      },
    ]);

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
  public async addBookmarkToCategory(_: Request, res: Response) {
    // const user = req.user as IUser;

    // const bookmarkId = Types.ObjectId(req.query.bookmarkId as string);
    // if (!user.bookmarks.includes(bookmarkId)) {
    //   throw new AppError('Bookmark not found', 404);
    // }

    // const updatedBookmark = await BookmarkModel.findByIdAndUpdate(bookmarkId, {
    //   $push: {
    //     category:
    //   }
    // })

    // successResponse(res, { category: categoryUpdated });
    res.json({ message: 'NOT IMPLEMENTED' });
  }

  /**
   * removeBookmarkFromCategory
   */
  public async removeBookmarkFromCategory(_: Request, res: Response) {
    res.json({ message: 'NOT IMPLEMENTED' });
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
