"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const category_route_1 = require("./app/modules/category/category.route");
const review_route_1 = require("./app/modules/review/review.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const course_route_1 = require("./app/modules/course/course.route");
const user_route_1 = require("./app/modules/user/user.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application route.
app.use('/', course_route_1.CourseRoute);
app.use('/', category_route_1.CategoryRoute);
app.use('/', review_route_1.ReviewRoute);
app.use('/', user_route_1.UserRoute);
app.use('/', auth_route_1.AuthRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
    });
});
//route error handler
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route is not found',
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
