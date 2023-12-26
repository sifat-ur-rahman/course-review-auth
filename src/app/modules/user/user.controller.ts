import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

const createUserRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewData = req.body;
    const result = await userService.userRegistrationIntoDB(reviewData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createUserRegistration,
};
