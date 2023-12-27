import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import userValidationSchema from './user.validation';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/api/auth/register',
  validateRequest(userValidationSchema),
  userControllers.createUserRegistration,
);
router.post(
  '/api/auth/change-password',
  auth('admin', 'user'),
  userControllers.changePassword,
);

export const UserRoute = router;
