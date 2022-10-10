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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.registerAdmin = void 0;
const responseHandler_1 = require("../../utils/responseHandler");
const hashPassword_1 = require("../../utils/hashPassword");
const model_1 = require("./model");
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user", req.body);
    const findAdmin = yield model_1.AdminModel.findOne({ email: req.body.email, fullName: req.body.fullName });
    try {
        console.log("before", findAdmin);
        if (!findAdmin) {
            console.log("After", findAdmin);
            let createAdmin = new model_1.AdminModel(req.body);
            createAdmin.email = req.body.email,
                createAdmin.fullName = req.body.fullName,
                createAdmin.phone = req.body.phone,
                createAdmin.password = (0, hashPassword_1.hashPassword)(req.body.password, "10");
            yield createAdmin.save();
            return (0, responseHandler_1.successHandler)(res, { admin: createAdmin }, "Admin Registered Successfully.");
        }
        if (findAdmin) {
            return (0, responseHandler_1.badRequestHandler)(res, "Admin Already Exist.");
        }
    }
    catch (err) {
        return (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user", req.body);
    try {
    }
    catch (err) {
        (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.loginAdmin = loginAdmin;
