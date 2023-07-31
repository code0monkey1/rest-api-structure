"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post('/register', controllers_1.registerController.registerUser);
router.post('/login', controllers_1.loginController.loginUser);
router.get('/me', auth_1.default, controllers_1.userController.me);
exports.default = router;
