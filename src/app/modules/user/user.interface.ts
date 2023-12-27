/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  passwordHistory: {
    password: string;
    timestamp: Date;
  }[];
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByUserName(username: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
export interface ReviewDocument extends TUser, Document {}
