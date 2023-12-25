import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/api/course',
  validateRequest(courseValidation.courseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/api/courses', CourseControllers.getAllCourse);
router.get(
  '/api/courses/:courseId/reviews',
  CourseControllers.getOneCourseWithReview,
);

router.put('/api/courses/:courseId', CourseControllers.updateCourse);

export const CourseRoute = router;
