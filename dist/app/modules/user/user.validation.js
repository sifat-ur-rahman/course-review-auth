"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
    }),
});
exports.default = exports.userValidationSchema;
