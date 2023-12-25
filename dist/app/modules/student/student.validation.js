"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const NameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(25)
        .nonempty({ message: 'First name is required' }),
    lastName: zod_1.z.string().min(1).max(25),
});
const GuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1).max(255),
    fatherContactNo: zod_1.z.string().min(1).max(255),
    fatherOccupation: zod_1.z.string().min(1).max(255),
    motherName: zod_1.z.string().min(1).max(255),
    motherContactNo: zod_1.z.string().min(1).max(255),
    motherOccupation: zod_1.z.string().min(1).max(255),
});
const LocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    contactNo: zod_1.z.string().min(1).max(255),
    occupation: zod_1.z.string().min(1).max(255),
});
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1).max(25),
    name: NameValidationSchema,
    gender: zod_1.z.enum(['male', 'female', 'other']),
    dateOfBirth: zod_1.z.string(),
    email: zod_1.z.string().email(),
    contactNo: zod_1.z.string().min(1).max(25),
    emergencyContactNo: zod_1.z.string().min(1).max(255),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
    presentAddress: zod_1.z.string().min(1).max(255),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    profileImg: zod_1.z.string(),
    isActive: zod_1.z.enum(['active', 'inactive']).default('active'),
});
exports.default = studentValidationSchema;
