import { NextFunction, Request, Response } from 'express';
import { CourseService } from './course.service';

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.body;

    const result = await CourseService.createCourseIntoDB(userData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Course created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CourseService.getAllCourseFromDB(req.query);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Courses retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getOneCourseWithReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const result = await CourseService.getOneCourseWithReviewFromDB(courseId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Course and Reviews retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.courseId;
    const updatedCourseData = req.body;
    const result = await CourseService.updateCourseFromDB(
      id,
      updatedCourseData,
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Course updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getOneCourseWithReview,
  updateCourse,
};
