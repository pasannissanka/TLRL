import { Router } from 'express';
import { param } from 'express-validator';
import bookmarkController from '../controllers/bookmark/bookmark.controller';
import { AuthenticationMiddleware } from '../helpers/auth/authentication.middleware';
import { catchAsync } from '../helpers/errors/catch_async';
import { catchValidationErrors } from '../helpers/errors/catch_validation_errors';

const router = Router();

router.post('/create', [
  AuthenticationMiddleware,
  catchAsync(bookmarkController.createNewBookmark),
]);

router.get('/all', [
  AuthenticationMiddleware,
  catchAsync(bookmarkController.getAllBookmarks),
]);

router.get('/id/:bookmarkId', [
  AuthenticationMiddleware,
  param('bookmarkId').isUUID(),
  catchValidationErrors,
  catchAsync(bookmarkController.getBookmark),
]);

router.post('/id/:bookmarkId', [
  AuthenticationMiddleware,
  param('bookmarkId').isUUID(),
  catchValidationErrors,
  catchAsync(bookmarkController.markAsReadBookmark),
]);

router.put('/id/:bookmarkId', [
  AuthenticationMiddleware,
  param('bookmarkId').isUUID(),
  catchValidationErrors,
  catchAsync(bookmarkController.editBookmark),
]);

router.delete('/id/:bookmarkId', [
  AuthenticationMiddleware,
  param('bookmarkId').isUUID(),
  catchValidationErrors,
  catchAsync(bookmarkController.deleteBookmark),
]);

export default router;
