"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const NameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(25),
    lastName: zod_1.z.string().min(1).max(25),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1).max(255),
    city: zod_1.z.string().min(1).max(255),
    country: zod_1.z.string().min(1).max(255),
});
const OrdersValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1).max(255),
    price: zod_1.z.number().min(0),
    quantity: zod_1.z.number().min(1),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    fullName: NameValidationSchema,
    password: zod_1.z.string(),
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: AddressValidationSchema,
    orders: zod_1.z.array(OrdersValidationSchema).optional().default([]),
});
exports.default = userValidationSchema;
