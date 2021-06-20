import { Router } from 'express';
import tagController from '../controllers/tag/tag.controller';
import { AuthenticationMiddleware } from '../helpers/auth/authentication.middleware';
import { catchAsync } from '../helpers/errors/catch_async';

const router = Router();

router.get('/all', [
  AuthenticationMiddleware,
  catchAsync(tagController.getAllTags),
]);

export default router;
