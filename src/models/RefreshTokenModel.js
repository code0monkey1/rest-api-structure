"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const mongoose_1 = require("mongoose");
// Declare the Schema of the Mongo model
const refreshTokenSchema = new mongoose_1.Schema({
    /* It's important to make the token unique, as that will provide us with a token id , which will help us in finding and deleting it from the DB later */
    token: {
        type: String,
        unique: true,
    },
}, {
    timestamps: false,
});
// Export the model
exports.default = (0, mongoose_1.model)('RefreshToken', refreshTokenSchema);
