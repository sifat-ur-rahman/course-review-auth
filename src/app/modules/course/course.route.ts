import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/api/courses',
  auth('admin'),
  validateRequest(courseValidation.courseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/api/courses', CourseControllers.getAllCourse);
router.get(
  '/api/courses/:courseId/reviews',
  CourseControllers.getOneCourseWithReview,
);

router.put(
  '/api/courses/:courseId',
  auth('admin'),
  CourseControllers.updateCourse,
);

export const CourseRoute = router;
