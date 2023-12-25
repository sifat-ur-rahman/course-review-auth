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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const student_validation_1 = __importDefault(require("./student.validation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = req.body;
        //data validation using zod
        const zodParserData = student_validation_1.default.parse(studentData);
        const result = yield student_service_1.StudentService.createStudentIntoDB(zodParserData);
        res.status(200).json({
            success: true,
            message: 'Student is create successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error,
        });
    }
});
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentService.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: 'Student are retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const getOneStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentService.getOneStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudent,
    getOneStudent,
};
