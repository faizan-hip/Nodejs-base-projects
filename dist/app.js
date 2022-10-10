"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const adminAuth_1 = require("./module/adminAuth");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({
    limit: "50mb",
}));
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
}));
app.use("/api/v1", [
    adminAuth_1.authRoutes,
]);
exports.default = app;
