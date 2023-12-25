import { TUser } from './user.interface';
import { User } from './user.model';

const userRegistrationIntoDB = async (Data: TUser) => {
  const result = await User.create(Data);
  return result;
};

export const userService = {
  userRegistrationIntoDB,
};
