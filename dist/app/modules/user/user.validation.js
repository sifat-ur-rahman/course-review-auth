"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.changePasswordValidationSchema = exports.userRegistrationValidationSchema = void 0;
const zod_1 = require("zod");
exports.userRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
    }),
});
exports.changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    }),
});
exports.userValidationSchema = {
    userRegistrationValidationSchema: exports.userRegistrationValidationSchema,
    changePasswordValidationSchema: exports.changePasswordValidationSchema,
};
