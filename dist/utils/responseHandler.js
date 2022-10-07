"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = exports.serverErrorHandler = exports.badRequestHandler = exports.unauthorizedHandler = exports.errorHandler = exports.noContent = exports.notFoundHandler = exports.successHandler = void 0;
const successHandler = (res, data, message) => {
    res.status(200).json({ message, data });
};
exports.successHandler = successHandler;
const notFoundHandler = (res, message) => {
    res.status(404).json({ message });
};
exports.notFoundHandler = notFoundHandler;
const noContent = (res, message) => {
    res.status(204).json({ message });
};
exports.noContent = noContent;
const errorHandler = (error, req, res, next) => {
    const { status = 500, message } = error;
    res.status(status).json(message);
};
exports.errorHandler = errorHandler;
const unauthorizedHandler = (res, error) => {
    res.status(401).json({ error: error.message });
};
exports.unauthorizedHandler = unauthorizedHandler;
const badRequestHandler = (res, message) => {
    res.status(400).json({ message: message });
};
exports.badRequestHandler = badRequestHandler;
const serverErrorHandler = (res, error, data) => {
    res.status(500).json({ error: error.message, data });
};
exports.serverErrorHandler = serverErrorHandler;
const validationHandler = (res, message) => {
    res.status(422).json({ error: message });
};
exports.validationHandler = validationHandler;
