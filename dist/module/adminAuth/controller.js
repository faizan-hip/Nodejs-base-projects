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
exports.updateAdmin = exports.verfiRegisterUserOtp = exports.loginAdmin = exports.registerAdmin = void 0;
const responseHandler_1 = require("../../utils/responseHandler");
const hashPassword_1 = require("../../utils/hashPassword");
const sendOtp_1 = require("../../utils/sendOtp");
const createToken_1 = require("../../utils/createToken");
const model_1 = require("./model");
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user", req.body);
    const findAdmin = yield model_1.AdminModel.findOne({ email: req.body.email });
    try {
        console.log("before", findAdmin);
        if (!findAdmin) {
            console.log("After", findAdmin);
            let createAdmin = new model_1.AdminModel(req.body);
            const otpGenerate = Math.floor(1000 + Math.random() * 9000).toString();
            createAdmin.email = req.body.email,
                createAdmin.fullName = req.body.fullName,
                createAdmin.phone = req.body.phone,
                createAdmin.password = (0, hashPassword_1.hashPassword)(req.body.password, "10");
            createAdmin.otpCode = otpGenerate;
            createAdmin.otpCodeExpires = new Date().getTime() + 300 * 1000;
            const resultt = yield (0, sendOtp_1.requestMobile)("+33600000000", otpGenerate);
            yield createAdmin.save();
            const token = (0, createToken_1.createToken)(req.body.email.toString());
            res.cookie("token", token, {
                secure: false,
                httpOnly: true,
            });
            console.log("resultt", resultt.body);
            return (0, responseHandler_1.successHandler)(res, { admin: createAdmin }, "Admin Registered Successfully.");
        }
        if (findAdmin && findAdmin.isVerified == true) {
            return (0, responseHandler_1.badRequestHandler)(res, "Admin Already Exist.");
        }
        if (findAdmin && findAdmin.isVerified == false) {
            const otpGenerate = Math.floor(1000 + Math.random() * 9000).toString();
            const updateForgetConfirmation = yield model_1.AdminModel.findOneAndUpdate({ email: req.body.email }, {
                $set: {
                    password: (0, hashPassword_1.hashPassword)(req.body.password, "10"),
                    fullName: req.body.fullName,
                    otpCode: otpGenerate,
                    otpCodeExpires: new Date().getTime() + 300 * 1000
                }
            });
            const resultt = yield (0, sendOtp_1.requestMobile)("+33600000000", otpGenerate);
            const token = (0, createToken_1.createToken)(req.body.email.toString());
            res.cookie("token", token, {
                secure: false,
                httpOnly: true,
            });
            return (0, responseHandler_1.successHandler)(res, { code: otpGenerate }, "code send to mobile");
        }
    }
    catch (err) {
        return (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user", req.body);
    const findAdmin = yield model_1.AdminModel.findOne({ email: req.body.email }).select(['password', 'isVerified']);
    console.log("findAdmin", findAdmin);
    try {
        if (!findAdmin) {
            return (0, responseHandler_1.badRequestHandler)(res, "email does not found");
        }
        if (findAdmin) {
            let password = (0, hashPassword_1.hashPassword)(req.body.password, "10");
            if (password != findAdmin.password) {
                return (0, responseHandler_1.badRequestHandler)(res, "password doesn't match");
            }
            else {
                if (findAdmin.isVerified == true) {
                    const token = (0, createToken_1.createToken)(req.body.email.toString());
                    res.cookie("token", token, {
                        secure: false,
                        httpOnly: true,
                    });
                    return (0, responseHandler_1.successHandler)(res, { admin: findAdmin }, "Admin Login Successfully.");
                }
                else {
                    return (0, responseHandler_1.badRequestHandler)(res, "isVerified falser");
                }
            }
        }
    }
    catch (err) {
        (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.loginAdmin = loginAdmin;
const verfiRegisterUserOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.params.confirmPassword", req.body);
    console.log("req.body", req.body);
    const findUser = yield model_1.AdminModel.findOne({
        otpCode: req.body.otpCode
    });
    console.log("findUser", findUser);
    try {
        const currentTime = new Date().getTime();
        if (!findUser) {
            return (0, responseHandler_1.badRequestHandler)(res, "confirmation code error");
        }
        if (findUser) {
            const data = findUser.otpCodeExpires - currentTime;
            console.log("data", data);
            if (data < 0) {
                return (0, responseHandler_1.badRequestHandler)(res, "Otp is expired");
            }
            const optCodeUpdate = yield model_1.AdminModel.findOneAndUpdate({ otpCode: req.body.otpCode }, {
                $set: {
                    otpCode: false,
                    isVerified: true,
                }
            });
            return (0, responseHandler_1.successHandler)(res, { user: optCodeUpdate }, "user verified true");
        }
    }
    catch (err) {
        return (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.verfiRegisterUserOtp = verfiRegisterUserOtp;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user", req.body);
    const findAdmin = yield model_1.AdminModel.findOne({ email: req.body.email });
    try {
        console.log("user", req.body);
        const findAdmin = yield model_1.AdminModel.findById(req.params.id);
        console.log("findAdmin", findAdmin);
    }
    catch (err) {
        return (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.updateAdmin = updateAdmin;
