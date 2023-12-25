export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};
export interface ReviewDocument extends TUser, Document {}
