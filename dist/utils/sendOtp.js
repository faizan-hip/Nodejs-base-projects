"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestMobile = void 0;
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const mailjett = node_mailjet_1.default.smsConnect("5d8dda6d23384db9a931413c7fd29eb2", {
    config: {
        version: 'v4'
    }
});
const requestMobile = function name(phoneNumber, otp) {
    {
        const data = {
            Text: otp,
            To: phoneNumber,
            From: "MJPilot"
        };
        const result = mailjett
            .post('sms-send', { version: 'v4' })
            .request(data);
        return result;
    }
};
exports.requestMobile = requestMobile;
