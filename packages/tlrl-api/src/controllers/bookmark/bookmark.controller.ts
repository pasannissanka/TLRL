import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import { BookmarkModel } from '../../models/bookmark/bookmark.model';
import { CategoryModel, ICategory } from '../../models/category/category.model';
import { IUser } from '../../models/user/user.model';

class BookmarkController {
  /**
   * createNewBookmark
   */
  public async createNewBookmark(req: Request, res: Response) {
    const user = req.user as IUser;
    let categoryData = {};

    // create a new category
    if (req.body.categoryNew && req.body.category) {
      const reqData = req.body.category as ICategory;

      if (user.categories.some((cat) => cat.name === reqData.name)) {
        throw new AppError('Invalid Category Name', 401);
      }

      const category = new CategoryModel({
        name: reqData.name,
        colorCode: reqData.colorCode,
        userId: user._id,
        parent: reqData.parent,
      });

      await category.save();
      categoryData = {
        name: reqData.name,
        _id: category._id,
      };
    }
    // validate category id
    if (req.body.categoryId) {
      if (
        user.categories.some(
          (cat) => cat._id === Types.ObjectId(req.body.categoryId)
        )
      ) {
        throw new AppError('Invalid Category Id', 401);
      }

      const category = await CategoryModel.findById(req.body.categoryId).exec();
      if (!category) {
        throw new AppError('Invalid Category Id 2', 401);
      }

      categoryData = {
        name: category.name,
        _id: category._id,
      };
    }

    const bookmark = new BookmarkModel({
      userId: user._id,
      title: req.body.title,
      url: req.body.url,
      publication: {
        faviconUrl: req.body.faviconUrl,
        hostname: req.body.hostname,
      },
      pubDate: req.body.pubDate,
      readingTime: req.body.readingTime,
      imgUrl: req.body.imgUrl,
      tags: req.body.tags,
      category: categoryData,
    });

    try {
      await bookmark.save();
    } catch (error) {
      throw new AppError('Bookmark creation failed!', 401);
    }

    successResponse(res, {
      bookmark,
    });
  }

  /**
   * getBookmark
   */
  public async getBookmark(req: Request, res: Response) {
    const user = req.user as IUser;

    if (!user.bookmarks.includes(Types.ObjectId(req.params.bookmarkId))) {
      throw new AppError('Bookmark not found', 404);
    }

    const bookmark = await BookmarkModel.findById(req.params.bookmarkId).exec();

    if (!bookmark) {
      throw new AppError('Bookmark not found', 404);
    }

    successResponse(res, {
      bookmark: bookmark,
    });
  }

  /**
   * getAllBookmarks
   */
  public async getAllBookmarks(req: Request, res: Response) {
    const user = req.user as IUser;

    const searchby = req.query.search as string;

    const queryOptions = {
      limit: parseInt(req.query.limit as string, 10) || 10,
      offset: parseInt(req.query.offset as string, 10) || 0,
    };

    // TODO get count, implement an aggregation
    const bookmarks = await BookmarkModel.find(
      {
        userId: user._id,
        isDeleted: false,
        $text: { $search: searchby },
      },
      null,
      { limit: queryOptions.limit, skip: queryOptions.offset }
    ).exec();

    const count = await BookmarkModel.countDocuments({
      userId: user._id,
      isDeleted: false,
      $text: { $search: searchby },
    }).exec();

    successResponse(res, {
      bookmarks,
      count,
    });
  }

  /**
   * markAsReadBookmark
   */
  public async markAsReadBookmark(req: Request, res: Response) {
    const user = req.user as IUser;
    const bookmarkId = Types.ObjectId(req.params.bookmarkId as string);

    if (!user.bookmarks.includes(bookmarkId)) {
      throw new AppError('Bookmark not found', 404);
    }

    const bookmark = await BookmarkModel.findByIdAndUpdate(
      bookmarkId,
      {
        $set: { isRead: true },
      },
      { new: true }
    );

    successResponse(res, {
      bookmark,
    });
  }

  /**
   * editBookmark
   */
  public async editBookmark(_: Request, res: Response) {
    successResponse(res, {}, 500, 'NOT IMPLEMENTED');
  }

  /**
   * deleteBookmark
   */
  public async deleteBookmark(req: Request, res: Response) {
    const user = req.user as IUser;
    const bookmarkId = Types.ObjectId(req.params.bookmarkId as string);

    if (!user.bookmarks.includes(bookmarkId)) {
      throw new AppError('Bookmark not found', 404);
    }

    const bookmark = await BookmarkModel.findByIdAndUpdate(
      bookmarkId,
      {
        $set: { isDeleted: true },
      },
      { new: true }
    );

    successResponse(res, {
      bookmark,
    });
  }
}

export default new BookmarkController();
