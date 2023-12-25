import express from 'express';
import { CategoryControllers } from './category.controller';
import categoryValidationSchema from './category.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/api/categories',
  validateRequest(categoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get('/api/categories', CategoryControllers.getAllCategory);

export const CategoryRoute = router;
