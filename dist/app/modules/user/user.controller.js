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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const createUserRegistration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewData = req.body;
        const result = yield user_service_1.userService.userRegistrationIntoDB(reviewData);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordData = req.body;
        const result = yield user_service_1.userService.changePasswordIntoDB(req.user, passwordData);
        const timestamp = result.formattedTimestamp;
        if (timestamp) {
            res.status(201).send({
                success: false,
                statusCode: 400,
                message: `error${timestamp}`,
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Password changed successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.userControllers = {
    createUserRegistration,
    changePassword,
};
