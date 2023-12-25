"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
//Create Validation Schema------
const tagValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean(),
});
const detailsValidationSchema = zod_1.z.object({
    level: zod_1.z.enum(['Beginner', 'Intermediate', 'Advanced']),
    description: zod_1.z.string(),
});
const courseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        instructor: zod_1.z.string(),
        categoryId: zod_1.z.string(),
        price: zod_1.z.number(),
        tags: zod_1.z.array(tagValidationSchema),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        language: zod_1.z.string(),
        provider: zod_1.z.string(),
        details: detailsValidationSchema,
    }),
});
//Update Validation Schema------
const tagUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
const detailsUpdateValidationSchema = zod_1.z.object({
    level: zod_1.z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    description: zod_1.z.string().optional(),
});
const courseUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z.array(tagUpdateValidationSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        provider: zod_1.z.string().optional(),
        details: detailsUpdateValidationSchema.optional(),
    }),
});
exports.courseValidation = {
    courseValidationSchema,
    courseUpdateValidationSchema,
};
