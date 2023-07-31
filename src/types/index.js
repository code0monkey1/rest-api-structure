"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUserAuth = void 0;
function hasUserAuth(req) {
    return (req.user !== undefined &&
        req.user._id !== undefined &&
        req.user.role !== undefined);
}
exports.hasUserAuth = hasUserAuth;
