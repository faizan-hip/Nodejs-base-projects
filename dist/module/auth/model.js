"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "User";
exports.COLLECTION_NAME = "users";
const schema = new mongoose_1.Schema({
    fullName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
        unique: true,
    },
    phone: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
    },
    isPromoValid: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        select: false,
        required: true,
    },
    forgetConfirmationCode: {
        type: String,
        unique: true,
        default: false
    },
    forgetConfirmationCodeExpires: {
        type: Date,
        default: new Date
    },
    resetPasswordToken: {
        type: String,
        unique: true,
        default: false
    },
    resetCodeExpires: {
        type: Date,
        default: new Date
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    otpCode: {
        type: String,
        unique: true,
        default: false
    },
    otpCodeExpires: {
        type: Date,
        default: new Date
    },
    isVerified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false,
});
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
