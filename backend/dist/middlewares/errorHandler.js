"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    const errStatusCode = err.statusCode || 500;
    const errMessage = err.message || 'Something went weong in server';
    res.status(errStatusCode).json({ message: errMessage });
};
exports.errorHandler = errorHandler;
