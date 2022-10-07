"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const server = (0, http_1.createServer)(app_1.default);
const port = Number(process.env.PORT || 9000);
(0, db_1.default)()
    .then(() => {
    server.listen(port, () => {
        console.log("Express server started on port: " + port);
    });
})
    .catch((err) => {
    console.log("error", err);
});
