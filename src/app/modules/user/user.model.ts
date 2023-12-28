import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    passwordHistory: [{ password: String, timestamp: Date }],
  },
  { timestamps: true },
);
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = this.toObject();
  delete data.password;
  delete data.passwordHistory;

  return data;
});

userSchema.statics.isUserExistsByUserName = async function (username: string) {
  return await User.findOne({ username }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TUser, UserModel>('User', userSchema);
