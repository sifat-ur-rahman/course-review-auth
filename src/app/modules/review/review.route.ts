import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { ReviewControllers } from './review.controller';
import reviewValidationSchema from './review.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/api/reviews',
  auth('user'),
  validateRequest(reviewValidationSchema),
  ReviewControllers.createReview,
);
router.get('/api/course/best', ReviewControllers.getBestReview);
export const ReviewRoute = router;
