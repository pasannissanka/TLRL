import { Request, Response } from 'express';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import User from '../../models/user/user';

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
      pubDate: req.body.pubDate,
      isRead: false,
    });

    successResponse(res, {
      bookmark,
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
    const bookmarks = await user.getBookmarks();

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
