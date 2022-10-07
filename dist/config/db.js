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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbURI = process.env.MONGODB_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 2000,
    socketTimeoutMS: 45000,
};
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connection.on("connected", () => {
    });
    mongoose_1.default.connection.on("error", (err) => {
    });
    mongoose_1.default.connection.on("disconnected", () => {
    });
    process.on("SIGINT", () => {
        mongoose_1.default.connection.close(() => {
            process.exit(0);
        });
    });
    return mongoose_1.default.connect("mongodb://localhost:27017/askip", options);
});
