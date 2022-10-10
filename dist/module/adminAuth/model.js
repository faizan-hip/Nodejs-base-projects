"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Admin";
exports.COLLECTION_NAME = "admins";
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
    isVerified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false
    },
    otpCodeExpires: {
        type: Date,
        default: new Date
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.AdminModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
