import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import userValidationSchema from './user.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/api/auth/register',
  validateRequest(userValidationSchema),
  userControllers.createUserRegistration,
);

export const UserRoute = router;
