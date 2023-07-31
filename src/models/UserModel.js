"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const mongoose_1 = require("mongoose");
// Declare the Schema of the Mongo model
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'customer',
    },
}, {
    timestamps: true,
});
// Export the model
exports.default = (0, mongoose_1.model)('User', userSchema);
