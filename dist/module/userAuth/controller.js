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
const model_1 = require("./model");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user", req.body);
    const findUser = yield model_1.UserModel.findOne({ email: req.body.email, phone: req.body.phone });
    console.log("findUser", findUser);
    try {
        if (!findUser) {
        }
    }
    catch (err) {
        (0, responseHandler_1.serverErrorHandler)(res, err);
    }
});
exports.registerUser = registerUser;
