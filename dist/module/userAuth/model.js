"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "User";
exports.COLLECTION_NAME = "users";
const schema = new mongoose_1.Schema({
    firstName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
        unique: true,
    },
    lastName: {
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
    phone: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        select: false,
        required: true,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        select: false,
        required: true,
    },
    otpCode: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        select: false,
        required: true,
    },
    otpCodeExpires: {
        type: Date,
        default: new Date
    },
    isVerified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
