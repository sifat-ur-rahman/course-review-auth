import { NextFunction, Request, Response } from 'express';
import { ReviewService } from './review.service';

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewData = req.body;
    const result = await ReviewService.createReviewIntoDB(reviewData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Review created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getBestReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.getBestReviewFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Best course retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ReviewControllers = {
  createReview,
  getBestReview,
};
