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
exports.userService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const userRegistrationIntoDB = (Data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(Data);
    return result;
});
const changePasswordIntoDB = (userData, passwordData) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = userData.userId;
    const newPassword = passwordData.newPassword;
    // Find the user by ID
    const user = yield user_model_1.User.findById(userId).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'you not a user');
    }
    // Verify the current password
    const isCurrentPasswordValid = yield user_model_1.User.isPasswordMatched(passwordData.currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Current password is incorrect');
    }
    // Check new password against the last 3 passwords in history
    const lastThreePasswords = user.passwordHistory.slice(-3);
    const isUniquePassword = lastThreePasswords.every((entry) => newPassword !== entry.password);
    if (!isUniquePassword) {
        const lastUsedPasswordTimestamp = user.passwordHistory.slice(-1)[0].timestamp;
        const formattedTimestamp = new Date(lastUsedPasswordTimestamp).toLocaleString();
        return { formattedTimestamp };
    }
    user.password = newPassword;
    user.passwordHistory.push({ password: newPassword, timestamp: new Date() });
    // Save the updated user to the database
    yield user.save();
    const responseData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    return responseData;
});
exports.userService = {
    userRegistrationIntoDB,
    changePasswordIntoDB,
};
