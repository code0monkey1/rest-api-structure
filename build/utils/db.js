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
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const isConnected = false;
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set('strictQuery', true);
    // defensive programming
    if (isConnected) {
        console.log('MongoDb is already connected');
        return;
    }
    yield mongoose_1.default.connect(config_1.DB_URL, {
        dbName: 'rest-api',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('db connected'));
});
exports.connectToDb = connectToDb;
