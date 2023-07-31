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
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
dotenv_1.default.config();
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./utils/db");
//Connect to MongoDb Database
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Code to execute
    yield (0, db_1.connectToDb)();
}))().catch((err) => {
    console.error(err);
});
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use('/api', routes_1.default);
/* `server.use(errorHandler);` is adding the `errorHandler` middleware to the Express server. */
//this is the last middle ware to be added , as it catches all async errors
server.use(errorHandler_1.default);
const PORT = config_1.APP_PORT || 3000;
server.listen(PORT, () => {
    console.log('listening to port ', PORT);
});
exports.default = server;
