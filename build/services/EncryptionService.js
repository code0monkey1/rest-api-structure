"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
class EncryptionService {
    /**
     * The function compares a hashed token with a provided token and returns a boolean indicating
     * whether they match.
     * @param {string} hashedToken - The `hashedToken` parameter is a string that represents a token that
     * has been hashed using a cryptographic algorithm. This is typically used for security purposes,
     * such as storing passwords securely in a database.
     * @param {string} providedToken - The `providedToken` parameter is the token that is being provided
     * by the user or client. It is the token that needs to be compared with the hashed token to check if
     * they match.
     * @returns a Promise that resolves to a boolean value.
     */
    static isMatch(data, encrypted) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield bcrypt.compare(data, encrypted);
            return match;
        });
    }
    /**
     * The function takes a token as input, hashes it using bcrypt with a specified number of salt
     * rounds, and returns the hashed token.
     * @param {string} token - The `token` parameter is a string that represents the token that needs to
     * be hashed.
     * @returns a Promise that resolves to a string, which is the hashed token.
     */
    static getHashedToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof token !== 'string') {
                throw new Error();
            }
            const SALT_ROUNDS = 10;
            const hashedToken = yield bcrypt.hash(token, SALT_ROUNDS);
            return hashedToken;
        });
    }
}
exports.default = EncryptionService;
