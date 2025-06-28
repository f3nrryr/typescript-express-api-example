"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(title, description, statusCode, stackTrace) {
        super();
        this.title = title;
        this.description = description;
        this.statusCode = statusCode;
        this.stackTrace = stackTrace;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map