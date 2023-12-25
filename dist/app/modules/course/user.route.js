"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/api/users', user_controller_1.UserControllers.createUser);
router.get('/api/users', user_controller_1.UserControllers.getAllUser);
router.get('/api/users/:userId', user_controller_1.UserControllers.getOneUser);
router.delete('/api/users/:userId', user_controller_1.UserControllers.deleteOneUser);
router.put('/api/users/:userId', user_controller_1.UserControllers.updateUser);
router.put('/api/users/:userId/orders', user_controller_1.UserControllers.updateUserOrder);
router.get('/api/users/:userId/orders', user_controller_1.UserControllers.getOneUserOrder);
router.get('/api/users/:userId/orders/total-price', user_controller_1.UserControllers.getOneUserOrderPrice);
exports.UserRoute = router;
