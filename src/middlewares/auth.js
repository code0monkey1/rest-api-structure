"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomErrorHandler_1 = __importDefault(require("../services/CustomErrorHandler"));
const JwtService_1 = __importDefault(require("../services/JwtService"));
const auth = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw CustomErrorHandler_1.default.userAuthFailed('Authorization Header Missing');
    const token = authHeader.split(' ')[1];
    console.log('token:', token);
    try {
        // verification un-bundles the jwt and provides the info within it
        const { _id, role } = JwtService_1.default.verify(token);
        const userInfo = {
            _id,
            role,
        };
        req.user = userInfo;
    }
    catch (e) {
        throw CustomErrorHandler_1.default.userAuthFailed('J.W.T Invalid');
    }
    next();
};
exports.default = auth;
