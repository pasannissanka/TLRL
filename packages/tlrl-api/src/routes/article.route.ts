import { Router } from 'express';
import { param } from 'express-validator';
import articleController from '../controllers/article/article.controller';
import { AuthenticationMiddleware } from '../helpers/auth/authentication.middleware';
import { catchAsync } from '../helpers/errors/catch_async';
import { catchValidationErrors } from '../helpers/errors/catch_validation_errors';

const router = Router();

router.get('/:bookmarkId', [
  AuthenticationMiddleware,
  param('bookmarkId').isMongoId(),
  catchValidationErrors,
  catchAsync(articleController.getReadabilityArticle),
]);

export default router;
