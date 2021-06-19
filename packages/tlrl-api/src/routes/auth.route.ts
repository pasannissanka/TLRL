import { Router } from 'express';
import AuthenticationController from '../controllers/auth/authentication';

const router = Router();

router.post('/register', (req, res) => {
  AuthenticationController.registerUser(req, res).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
});

router.post('/login', (req, res) => {
  AuthenticationController.loginUser(req, res).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
});

router.post('/user', [AuthenticationController.getUser]);

export default router;
