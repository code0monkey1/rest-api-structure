"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.registerController = exports.loginController = void 0;
/* The line `export { default as registerController } from './auth/registerController';` is exporting
the `registerController` object from the `registerController` file located in the `./auth`
directory. */
var loginController_1 = require("./auth/loginController");
Object.defineProperty(exports, "loginController", { enumerable: true, get: function () { return __importDefault(loginController_1).default; } });
var registerController_1 = require("./auth/registerController");
Object.defineProperty(exports, "registerController", { enumerable: true, get: function () { return __importDefault(registerController_1).default; } });
var userController_1 = require("./auth/userController");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return __importDefault(userController_1).default; } });
