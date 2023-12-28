import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { userValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/api/auth/register',
  validateRequest(userValidationSchema.userRegistrationValidationSchema),
  userControllers.createUserRegistration,
);
router.post(
  '/api/auth/change-password',
  auth('admin', 'user'),
  validateRequest(userValidationSchema.changePasswordValidationSchema),
  userControllers.changePassword,
);

export const UserRoute = router;
