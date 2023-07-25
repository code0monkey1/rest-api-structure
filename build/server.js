"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
const PORT = config_1.APP_PORT || 3000;
server.listen(PORT, () => {
    console.log('listening to port ', PORT);
});
exports.default = server;
