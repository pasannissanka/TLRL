import { Router } from 'express';
import { body } from 'express-validator';
import AuthenticationController from '../controllers/auth/authentication';
import { AuthenticationMiddleware } from '../helpers/auth/authentication.middleware';
import { catchAsync } from '../helpers/errors/catch_async';
import { catchValidationErrors } from '../helpers/errors/catch_validation_errors';

const router = Router();

/*
 ** @note If this way of error handling grows too
 ** complex, switch to schema validation
 ** https://express-validator.github.io/docs/schema-validation.html
 */

router.post('/register', [
  body('email').isEmail().notEmpty(),
  body('password').isLength({ min: 8 }).notEmpty(),
  body('userName').notEmpty(),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  catchValidationErrors,
  catchAsync(AuthenticationController.registerUser),
]);

router.post('/login', [
  body('email').isEmail().optional(),
  body('userName').optional(),
  body('password').isLength({ min: 8 }).notEmpty(),
  catchValidationErrors,
  catchAsync(AuthenticationController.loginUser),
]);

router.get('/user', [
  AuthenticationMiddleware,
  AuthenticationController.getUser,
]);

export default router;
