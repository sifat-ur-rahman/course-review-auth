import { z } from 'zod';

//Create Validation Schema------
const tagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
});

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagValidationSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: detailsValidationSchema,
  }),
});

//Update Validation Schema------

const tagUpdateValidationSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const detailsUpdateValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});

const courseUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(tagUpdateValidationSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: detailsUpdateValidationSchema.optional(),
  }),
});
export const courseValidation = {
  courseValidationSchema,
  courseUpdateValidationSchema,
};
