import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import Category from '../../models/category/category.model';
import { Tag } from '../../models/tag/tag.model';
import User from '../../models/user/user.model';
import { BookmarkQuery } from '../../types/types';

class BookmarkController {
  /**
   * createNewBookmark
   */
  public async createNewBookmark(req: Request, res: Response) {
    const user = req.user as User;
    const bookmark = await user.createBookmark({
      userId: (req.user as User).userId,
      title: req.body.title,
      subtitle: req.body.subtitle,
      url: req.body.url,
      publication: req.body.publication,
      readingTime: req.body.readingTime,
      imgUrl: req.body.imgUrl,
      faviconUrl: req.body.faviconUrl,
      pubDate: req.body.pubDate,
      isRead: false,
    });

    let tag: Tag;
    const userTags = await user.getTags({ where: { tag: req.body.tag } });

    if (!userTags || userTags.length === 0) {
      tag = await bookmark.createTag({
        tag: req.body.tag,
        userId: user.userId,
      });
    } else {
      bookmark.addTag(userTags[0]);
      tag = userTags[0];
    }

    successResponse(res, {
      bookmark,
      tag,
    });
  }

  /**
   * getBookmark
   */
  public async getBookmark(req: Request, res: Response) {
    const user = req.user as User;
    const bookmark = await user.getBookmarks({
      where: {
        bookmarkId: req.params.bookmarkId,
      },
    });

    if (!bookmark || bookmark.length === 0) {
      throw new AppError('Bookmark not found', 404);
    }

    successResponse(res, {
      bookmark: bookmark[0],
    });
  }

  /**
   * getAllBookmarks
   */
  public async getAllBookmarks(req: Request, res: Response) {
    const user = req.user as User;
    const query = { ...req.query } as BookmarkQuery;

    // sort='latest' , tag=tagName , category=categoryId
    // limit , offset

    const catQ = query.category
      ? { categoryId: { [Op.eq]: query.category } }
      : undefined;
    const tagQ = query.tag
      ? { tag: { [Op.iLike]: `%${query.tag}%` } }
      : undefined;

    const include = [
      {
        model: Category,
        where: catQ,
      },
      {
        model: Tag,
        where: tagQ,
      },
    ];

    const bookmarks = await user.getBookmarks({
      include: include,
      order: [['createdAt', 'DESC']],
      limit: query.limit,
    });

    successResponse(res, {
      bookmarks,
    });
  }

  /**
   * markAsReadBookmark
   */
  public async markAsReadBookmark(req: Request, res: Response) {
    const user = req.user as User;
    const bookmark = await user
      .getBookmarks({
        where: {
          bookmarkId: req.params.bookmarkId,
        },
      })
      .then(async (bookmarks) => {
        if (!bookmarks || bookmarks.length === 0) {
          throw new AppError('Bookmark Not found', 404);
        }
        const result = await bookmarks[0].update({ isRead: true });
        return result;
      });

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
    const user = req.user as User;
    await user
      .getBookmarks({
        where: {
          bookmarkId: req.params.bookmarkId,
        },
      })
      .then(async (bookmarks) => {
        if (!bookmarks || bookmarks.length === 0) {
          throw new AppError('Bookmark Not found', 404);
        }
        await bookmarks[0].destroy();
      });

    successResponse(res, {});
  }
}

export default new BookmarkController();
