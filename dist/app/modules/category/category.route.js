"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = __importDefault(require("./category.validation"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/api/categories', (0, validateRequest_1.default)(category_validation_1.default), category_controller_1.CategoryControllers.createCategory);
router.get('/api/categories', category_controller_1.CategoryControllers.getAllCategory);
exports.CategoryRoute = router;
