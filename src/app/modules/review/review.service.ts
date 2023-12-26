/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { Course } from '../course/course.model';
import { ReviewDocument, TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (
  userData: JwtPayload,
  reviewData: TReview,
) => {
  const course = await Course.findById(reviewData.courseId);
  if (!course) {
    throw new AppError(400, `${reviewData.courseId} no course with courseId`);
  }
  const saveData = {
    ...reviewData,
    createdBy: userData.userId,
  };

  const result = await (
    await Review.create(saveData)
  ).populate('createdBy', '_id username email role');
  return result;
};

const getBestReviewFromDB = async () => {
  const reviews: ReviewDocument[] = await Review.find();

  const averageRatingsObj: Record<string, { total: number; count: number }> =
    {};

  for (let i = 0; i < reviews.length; i++) {
    const item = reviews[i];
    const { courseId, rating } = item;

    if (!averageRatingsObj[courseId]) {
      averageRatingsObj[courseId] = { total: 0, count: 0 };
    }

    averageRatingsObj[courseId].total += rating;
    averageRatingsObj[courseId].count += 1;
  }

  const averageRatingsReview: Record<string, number> = {};

  for (const courseId in averageRatingsObj) {
    const { total, count } = averageRatingsObj[courseId];
    averageRatingsReview[courseId] = total / count;
  }

  let maxCourseId: string | null = null;
  let maxRating = -1;
  let count = 0;

  for (const courseId in averageRatingsReview) {
    if (averageRatingsReview[courseId] > maxRating) {
      maxRating = averageRatingsReview[courseId];

      maxCourseId = courseId;
      count = averageRatingsObj[courseId].count;
    }
  }

  const course = await Course.findOne({ _id: maxCourseId });

  const result = {
    course,
    averageRating: maxRating,
    reviewCount: count,
  };

  return result;
};
export const ReviewService = {
  createReviewIntoDB,
  getBestReviewFromDB,
};
