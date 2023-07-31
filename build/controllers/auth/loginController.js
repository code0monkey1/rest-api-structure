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
const config_1 = require("../../config");
const models_1 = require("../../models");
const CustomErrorHandler_1 = __importDefault(require("../../services/CustomErrorHandler"));
const EncryptionService_1 = __importDefault(require("../../services/EncryptionService"));
const JwtService_1 = __importDefault(require("../../services/JwtService"));
const validation_1 = require("../../validation");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //[+] validate login user schema
    const { email, password } = validation_1.loginSchema.parse(req.body);
    console.log('🚀 ~ file: loginController.ts:20 ~  email, password :', email, password);
    const user = yield models_1.UserModel.findOne({ email });
    console.log('🚀 ~ file: loginController.ts:22 ~ user:', user);
    if (!user) {
        throw CustomErrorHandler_1.default.wrongCredentials();
    }
    //[+] verify if password matches
    const match = yield EncryptionService_1.default.isMatch(password, user.password);
    if (!match) {
        throw CustomErrorHandler_1.default.wrongCredentials();
    }
    // [+] sign jwt
    const access_token = yield JwtService_1.default.sign({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        _id: user._id,
        role: user.role,
    });
    //[+] create refresh token
    const refresh_token = yield JwtService_1.default.sign({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        _id: user._id,
        role: user.role,
    }, '1y', config_1.REFRESH_TOKEN_SECRET);
    //[+] save refresh token to db
    yield models_1.RefreshTokenModel.create({ token: refresh_token });
    // [+] send jwt to frontend
    res.json({
        access_token,
        refresh_token,
    });
});
exports.default = {
    loginUser,
};
