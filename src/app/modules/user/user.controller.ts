import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

const createUserRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.body;
    const result = await userService.userRegistrationIntoDB(userData);

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
    const timestamp = result.formattedTimestamp;
    if (timestamp) {
      res.status(400).send({
        success: false,
        statusCode: 400,
        message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${timestamp}).`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
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
