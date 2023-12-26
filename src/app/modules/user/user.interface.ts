/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
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
export interface ReviewDocument extends TUser, Document {}
