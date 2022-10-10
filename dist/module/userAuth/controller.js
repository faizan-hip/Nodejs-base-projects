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
exports.registerUser = void 0;
const responseHandler_1 = require("../../utils/responseHandler");
const hashPassword_1 = require("../../utils/hashPassword");
const sendOtp_1 = require("../../utils/sendOtp");
const createToken_1 = require("../../utils/createToken");
const model_1 = require("./model");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user", req.body);
    const findUser = yield model_1.UserModel.findOne({ email: req.body.email, phone: req.body.phone });
    try {
        if (!findUser) {
            console.log("After", findUser);
            let createUser = new model_1.UserModel();
            const otpGenerate = Math.floor(1000 + Math.random() * 9000).toString();
            createUser.firstName = req.body.firstName,
                createUser.lastName = req.body.lastName,
                createUser.email = req.body.email,
                createUser.phone = req.body.phone,
                createUser.password = (0, hashPassword_1.hashPassword)(req.body.password, "10");
            createUser.otpCode = otpGenerate;
            createUser.otpCodeExpires = new Date().getTime() + 300 * 1000;
            const resultt = yield (0, sendOtp_1.requestMobile)("+33600000000", otpGenerate);
            yield createUser.save();
            const token = (0, createToken_1.createToken)(req.body.email.toString());
            res.cookie("token", token, {
                secure: false,
                httpOnly: true,
            });
            console.log("resultt", resultt.body);
            return (0, responseHandler_1.successHandler)(res, { admin: createUser }, "Admin Registered Successfully.");
        }
        if (findUser && findUser.isVerified == true) {
            return (0, responseHandler_1.badRequestHandler)(res, "Admin Already Exist.");
        }
        if (findUser && findUser.isVerified == false) {
            const otpGenerate = Math.floor(1000 + Math.random() * 9000).toString();
            const updateForgetConfirmation = yield model_1.UserModel.findOneAndUpdate({ email: req.body.email }, {
                $set: {
                    password: (0, hashPassword_1.hashPassword)(req.body.password, "10"),
                    firstName: req.body.firstName,
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
        (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.registerUser = registerUser;
