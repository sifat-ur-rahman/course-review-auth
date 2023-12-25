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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const FullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'First name is required '] },
    lastName: { type: String },
});
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const OrdersSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: FullNameSchema },
    age: { type: Number, required: true },
    email: { type: String, trim: true, required: true },
    isActive: { type: Boolean },
    hobbies: { type: [String] },
    address: { type: AddressSchema, required: true },
    orders: { type: [OrdersSchema], default: [] },
});
userSchema.methods.isUserExits = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ id });
        return existingUser;
    });
};
userSchema.pre(/^find/, function (next) {
    this.select('-password');
    next();
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const userData = this;
        userData.password = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.method('toJSON', function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = this.toObject();
    delete data.password;
    return data;
});
exports.User = (0, mongoose_1.model)('User', userSchema);
