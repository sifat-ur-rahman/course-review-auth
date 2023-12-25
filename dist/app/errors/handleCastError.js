"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    var _a, _b;
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    const failedValue = (_b = (_a = errorSources[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.match(/"([^"]*)"/)[1];
    const errorMessage = `${failedValue} is not a valid ID!`;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources: errorMessage,
    };
};
exports.default = handleCastError;
