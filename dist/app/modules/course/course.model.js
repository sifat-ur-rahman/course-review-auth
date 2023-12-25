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
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const TagsSchema = new mongoose_1.Schema({
    name: { type: String },
    isDeleted: { type: Boolean },
});
const DetailsSchema = new mongoose_1.Schema({
    level: { type: String, required: true },
    description: { type: String, required: true },
});
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: { type: Number, required: true },
    tags: { type: [TagsSchema], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    details: { type: DetailsSchema, required: true },
    durationInWeeks: { type: Number, default: 0 },
});
courseSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const course = this;
        const CourseStartDate = new Date(course.startDate);
        const CourseEndDate = new Date(course.endDate);
        course.durationInWeeks = Math.ceil((CourseEndDate - CourseStartDate) / (1000 * 60 * 60 * 24 * 7));
        next();
    });
});
courseSchema.methods.isCourseExits = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingCourse = yield exports.Course.findById(id);
        return existingCourse;
    });
};
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
