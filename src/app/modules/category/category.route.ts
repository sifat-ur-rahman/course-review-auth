import express from 'express';
import { CategoryControllers } from './category.controller';
import categoryValidationSchema from './category.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/api/categories',
  auth('admin'),
  validateRequest(categoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get('/api/categories', CategoryControllers.getAllCategory);

export const CategoryRoute = router;
