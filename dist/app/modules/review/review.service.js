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
exports.ReviewService = void 0;
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
const AppError_1 = __importDefault(require("../../errors/AppError"));
const course_model_1 = require("../course/course.model");
const review_model_1 = require("./review.model");
const createReviewIntoDB = (Data) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(Data.courseId);
    if (!course) {
        throw new AppError_1.default(400, `${Data.courseId} no course with courseId`);
    }
    const result = yield review_model_1.Review.create(Data);
    return result;
});
const getBestReviewFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find();
    const averageRatingsObj = {};
    for (let i = 0; i < reviews.length; i++) {
        const item = reviews[i];
        const { courseId, rating } = item;
        if (!averageRatingsObj[courseId]) {
            averageRatingsObj[courseId] = { total: 0, count: 0 };
        }
        averageRatingsObj[courseId].total += rating;
        averageRatingsObj[courseId].count += 1;
    }
    const averageRatingsReview = {};
    for (const courseId in averageRatingsObj) {
        const { total, count } = averageRatingsObj[courseId];
        averageRatingsReview[courseId] = total / count;
    }
    let maxCourseId = null;
    let maxRating = -1;
    let count = 0;
    for (const courseId in averageRatingsReview) {
        if (averageRatingsReview[courseId] > maxRating) {
            maxRating = averageRatingsReview[courseId];
            maxCourseId = courseId;
            count = averageRatingsObj[courseId].count;
        }
    }
    const course = yield course_model_1.Course.findOne({ _id: maxCourseId });
    const result = {
        course,
        averageRating: maxRating,
        reviewCount: count,
    };
    return result;
});
exports.ReviewService = {
    createReviewIntoDB,
    getBestReviewFromDB,
};
