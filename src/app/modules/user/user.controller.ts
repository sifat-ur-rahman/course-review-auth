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
const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const passwordData = req.body;
    const result = await userService.changePasswordIntoDB(
      req.user,
      passwordData,
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Password changed successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createUserRegistration,
  changePassword,
};
