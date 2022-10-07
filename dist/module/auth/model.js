"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Token";
exports.COLLECTION_NAME = "tokens";
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    refreshToken: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.TokenModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
