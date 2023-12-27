"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = __importDefault(require("./user.validation"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/api/auth/register', (0, validateRequest_1.default)(user_validation_1.default), user_controller_1.userControllers.createUserRegistration);
router.post('/api/auth/change-password', (0, auth_1.default)('admin', 'user'), user_controller_1.userControllers.changePassword);
exports.UserRoute = router;
