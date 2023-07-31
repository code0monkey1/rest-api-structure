"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
// validationSchemas.ts
const zod_1 = require("zod");
exports.registerSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(3).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    repeat_password: zod_1.z.string().min(6),
})
    /* The `.refine()` method is used to add additional validation rules to the validation schema. In
      this case, it is checking if the `password` field is equal to the `repeat_password` field. If
      they are not equal, it will throw an error with the specified message ("Passwords don't match")
      and the path of the error will be set to `['repeat_password']`. This allows for more specific
      error messages and error paths when validating the data. */
    .refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ['repeat_password'], // path of error
});
exports.registerSchema.refine((obj) => obj.password != obj.repeat_password);
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
