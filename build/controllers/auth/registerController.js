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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Checklist
    //[-] authorize the request
    const body = yield req.body;
    // [+] validate the request
    const validatedData = validation_1.registerSchema.parse(body);
    console.log('body', validatedData);
    //[+] check if user is in database already
    const { username, email, password } = validatedData;
    /* The line `const userExists = await UserModel.exists({ email });` is checking if a user with the
     given email already exists in the database. It uses the `exists` method of the `UserModel` to
     perform the check. The `exists` method takes a query object as an argument, in this case `{ email
     }`, and returns a boolean value indicating whether a document matching the query exists in the
     database. */
    const userExists = yield models_1.UserModel.exists({ email });
    if (userExists)
        throw CustomErrorHandler_1.default.alreadyExists('This email is already taken');
    //[+] prepare model
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const hashedPassword = yield EncryptionService_1.default.getHashedToken(password);
    const user = {
        username,
        email,
        password: hashedPassword,
        role: 'whatever',
    };
    //[+] store in database
    const newUser = yield models_1.UserModel.create(user);
    console.log('new user created', JSON.stringify(newUser, null, 3));
    //[+] generate jwt
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const access_token = yield JwtService_1.default.sign({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        _id: newUser._id,
        role: newUser.role,
    });
    //[+] create refresh token
    const refresh_token = yield JwtService_1.default.sign({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        _id: newUser._id,
        role: newUser.role,
    }, '1y', config_1.REFRESH_TOKEN_SECRET);
    //[+] save refresh token to db
    yield models_1.RefreshTokenModel.create({ token: refresh_token });
    // [+] send response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.send({ message: 'valid', access_token, refresh_token });
});
exports.default = {
    registerUser,
};
