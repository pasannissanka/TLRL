import { isProbablyReaderable, Readability } from '@mozilla/readability';
import axios from 'axios';
import { Request, Response } from 'express';
import { JSDOM } from 'jsdom';
import { AppError } from '../../helpers/errors/app_error';
import { successResponse } from '../../helpers/response/success_response';
import User from '../../models/user/user.model';
// import sanitizeHtml from 'sanitize-html';

class ArticleController {
  /**
   * getReadabilityArticle
   */
  public async getReadabilityArticle(req: Request, res: Response) {
    const user = req.user as User;
    const bookmark = await user.getBookmarks({
      where: {
        bookmarkId: req.params.bookmarkId,
      },
    });
    if (!bookmark || bookmark.length === 0) {
      throw new AppError('Bookmark not found', 404);
    }
    const html = await (await axios.get(bookmark[0].url)).data;
    const dom = new JSDOM(html);
    let article: any;
    if (isProbablyReaderable(dom.window.document)) {
      article = new Readability(dom.window.document).parse();
    } else {
      successResponse(res, {}, 201, 'Probably Not Readerable');
    }

    //
    // const clean = sanitizeHtml(article?.content!);

    successResponse(res, {
      title: article?.title,
      byline: article?.byline,
      dir: article?.dir,
      excerpt: article?.excerpt,
      content: article?.content,
      textContent: article?.textContent,
      siteName: article?.siteName,
      length: article?.length,
    });
  }
}

export default new ArticleController();
