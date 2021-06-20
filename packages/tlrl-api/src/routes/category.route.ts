import { Router } from 'express';
import categoryController from '../controllers/category/category.controller';
import { AuthenticationMiddleware } from '../helpers/auth/authentication.middleware';
import { catchAsync } from '../helpers/errors/catch_async';

const router = Router();

router.get('/all', [
  AuthenticationMiddleware,
  catchAsync(categoryController.getAllCategories),
]); // get all

router.post('/create', [
  AuthenticationMiddleware,
  catchAsync(categoryController.createCategory),
]); // create new

router.get('/id/:categoryId', [
  AuthenticationMiddleware,
  catchAsync(categoryController.getCategory),
]); // get one

router.post('/id/:categoryId', [
  AuthenticationMiddleware,
  catchAsync(categoryController.editCategory),
]); // update one (rename)

router.put('/id/:categoryId', [
  AuthenticationMiddleware,
  catchAsync(categoryController.addBookmarkToCategory),
]); // add bookmark

router.patch('/id/:categoryId', [
  AuthenticationMiddleware,
  catchAsync(categoryController.removeBookmarkFromCategory),
]); // remove bookmark

router.delete('/id/:categoryId', [
  AuthenticationMiddleware,
  catchAsync(categoryController.deleteCategory),
]); // delete folder

router.post('/id/:categoryId/move', [
  AuthenticationMiddleware,
  catchAsync(categoryController.moveBookmarkCategory),
]); // move bookmark category

export default router;
