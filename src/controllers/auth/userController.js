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
const models_1 = require("../../models");
const CustomErrorHandler_1 = __importDefault(require("../../services/CustomErrorHandler"));
const types_1 = require("../../types");
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, types_1.hasUserAuth)(req))
        throw CustomErrorHandler_1.default.userAuthFailed('user not attached');
    const EXCLUDED_FIELDS = '-password -updatedAt -createdAt -__v';
    /*  The `select` method is used to
      specify which fields should be included or excluded from the result. In this case, the
      `-password -updatedAt -createdAt -__v` fields are excluded from the result. */
    const foundUser = yield models_1.UserModel.findById(req.user._id).select(EXCLUDED_FIELDS);
    console.log('🚀 ~ file: userController.ts:15 ~ foundUser:', foundUser);
    if (!foundUser)
        throw CustomErrorHandler_1.default.notFound('User Not Found');
    res.json(foundUser);
});
exports.default = {
    me,
};
