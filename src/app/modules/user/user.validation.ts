import { z } from 'zod';

export const userRegistrationValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});
export const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
  }),
});

export const userValidationSchema = {
  userRegistrationValidationSchema,
  changePasswordValidationSchema,
};
