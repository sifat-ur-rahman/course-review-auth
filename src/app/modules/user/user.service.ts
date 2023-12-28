/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';

const userRegistrationIntoDB = async (Data: TUser) => {
  const result = await User.create(Data);
  return result;
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  passwordData: { currentPassword: string; newPassword: string },
) => {
  const userId = userData.userId;
  const newPassword = passwordData.newPassword;
  // Find the user by ID
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'you not a user');
  }
  // Verify the current password
  const isCurrentPasswordValid = await User.isPasswordMatched(
    passwordData.currentPassword,
    user.password,
  );

  if (!isCurrentPasswordValid) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Current password is incorrect');
  }

  // Check new password against the last 3 passwords in history
  const lastThreePasswords = user.passwordHistory.slice(-3);
  const isUniquePassword = lastThreePasswords.every(
    (entry: any) => newPassword !== entry.password,
  );

  if (!isUniquePassword) {
    const lastUsedPasswordTimestamp =
      user.passwordHistory.slice(-1)[0].timestamp;
    const formattedTimestamp = new Date(
      lastUsedPasswordTimestamp,
    ).toLocaleString();

    return { formattedTimestamp };
  }
  user.password = newPassword;
  user.passwordHistory.push({ password: newPassword, timestamp: new Date() });

  // Save the updated user to the database
  await user.save();
  const responseData = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return responseData;
};
export const userService = {
  userRegistrationIntoDB,
  changePasswordIntoDB,
};
