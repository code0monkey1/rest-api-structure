"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SECRET = exports.JWT_SECRET = exports.DB_URL = exports.DEBUG_MODE = exports.APP_PORT = void 0;
/* The code `export const { APP_PORT } = process.env;` is exporting a constant variable `APP_PORT` from
the `process.env` object. */
_a = process.env, exports.APP_PORT = _a.APP_PORT, exports.DEBUG_MODE = _a.DEBUG_MODE, exports.DB_URL = _a.DB_URL, exports.JWT_SECRET = _a.JWT_SECRET, exports.REFRESH_TOKEN_SECRET = _a.REFRESH_TOKEN_SECRET;
