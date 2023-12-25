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
exports.StudentService = void 0;
const user_model_1 = require("../user.model");
const createStudentIntoDB = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    //const result = await StudentModel.create(student);//build in static method
    const student = new user_model_1.Student(studentData);
    if (yield student.isUserExits(studentData.id)) {
        throw new Error('Student already exist');
    }
    const result = yield student.save();
    return result;
});
const getAllStudentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Student.find();
    return result;
});
const getOneStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Student.findOne({ id });
    return result;
});
exports.StudentService = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getOneStudentFromDB,
};
