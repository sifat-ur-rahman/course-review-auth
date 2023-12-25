"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const NameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'First name is required '] },
    lastName: { type: String },
});
const GuardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherContactNo: { type: String, required: true },
    motherOccupation: { type: String, required: true },
});
const LocalGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    contactNo: { type: String, required: true },
    occupation: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: NameSchema, required: true },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "The gender field can only be one of the following: 'male', 'female' or 'other'",
        },
        required: true,
    },
    dateOfBirth: { type: String },
    email: { type: String, trim: true, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
            message: '{VALUE} is not valid',
        },
    },
    presentAddress: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    localGuardian: { type: LocalGuardianSchema, required: true },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
});
studentSchema.methods.isUserExits = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
