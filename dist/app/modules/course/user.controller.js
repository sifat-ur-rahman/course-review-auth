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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        //data validation using zod
        const zodParserData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.UserService.createUserIntoDB(zodParserData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserService.getOneUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;
        const result = yield user_service_1.UserService.updateUserFromDB(userId, updatedUserData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
            err,
        });
    }
});
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_service_1.UserService.deleteOneUserFromDB(userId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;
        const result = yield user_service_1.UserService.updateUserOrderFromDB(userId, updatedUserData);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
            err,
        });
    }
});
const getOneUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserService.getOneUserOrderFromDB(userId);
        const orders = result === null || result === void 0 ? void 0 : result.orders;
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: { orders },
        });
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getOneUserOrderPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserService.getOneUserOrderFromDB(userId);
        const orders = result === null || result === void 0 ? void 0 : result.orders;
        if (orders) {
            let calculatedPrice = 0;
            for (let i = 0; i < orders.length; i++) {
                const element = orders[i];
                calculatedPrice += element.price * element.quantity;
            }
            const totalPrice = Number(calculatedPrice.toFixed(2));
            res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: { totalPrice },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUser,
    getOneUser,
    deleteOneUser,
    updateUser,
    updateUserOrder,
    getOneUserOrder,
    getOneUserOrderPrice,
};
