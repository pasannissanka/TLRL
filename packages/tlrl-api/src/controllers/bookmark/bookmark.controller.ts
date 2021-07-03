import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import { BookmarkModel } from '../../models/bookmark/bookmark.model';
import { CategoryModel, ICategory } from '../../models/category/category.model';
import { IUser } from '../../models/user/user.model';
import { BookmarkQuery } from '../../types/types';

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
        throw new AppError('Invalid Category Id', 401);
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
    // const user = req.user as User;
    // const query = { ...req.query } as BookmarkQuery;

    // // sort='latest' , tag=tagName , category=categoryId
    // // limit , offset

    // const catQ = query.category
    //   ? { categoryId: { [Op.eq]: query.category } }
    //   : undefined;
    // const tagQ = query.tag
    //   ? { tag: { [Op.iLike]: `%${query.tag}%` } }
    //   : undefined;

    // const include = [
    //   {
    //     model: Category,
    //     where: catQ,
    //   },
    //   {
    //     model: Tag,
    //     where: tagQ,
    //   },
    // ];

    // const bookmarks = await user.getBookmarks({
    //   include: include,
    //   order: [['createdAt', 'DESC']],
    //   limit: query.limit,
    // });

    // successResponse(res, {
    //   bookmarks,
    // });
    res.json({ message: 'NOT IMPLEMENTED' });
  }

  /**
   * markAsReadBookmark
   */
  public async markAsReadBookmark(req: Request, res: Response) {
    // const user = req.user as User;
    // const bookmark = await user
    //   .getBookmarks({
    //     where: {
    //       bookmarkId: req.params.bookmarkId,
    //     },
    //   })
    //   .then(async (bookmarks) => {
    //     if (!bookmarks || bookmarks.length === 0) {
    //       throw new AppError('Bookmark Not found', 404);
    //     }
    //     const result = await bookmarks[0].update({ isRead: true });
    //     return result;
    //   });

    // successResponse(res, {
    //   bookmark,
    // });
    res.json({ message: 'NOT IMPLEMENTED' });
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
    // const user = req.user as User;
    // await user
    //   .getBookmarks({
    //     where: {
    //       bookmarkId: req.params.bookmarkId,
    //     },
    //   })
    //   .then(async (bookmarks) => {
    //     if (!bookmarks || bookmarks.length === 0) {
    //       throw new AppError('Bookmark Not found', 404);
    //     }
    //     await bookmarks[0].destroy();
    //   });

    // successResponse(res, {});
    res.json({ message: 'NOT IMPLEMENTED' });
  }
}

export default new BookmarkController();
