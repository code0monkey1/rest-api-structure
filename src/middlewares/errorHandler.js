"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = require("../config");
const errorHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let data = Object.assign({ message: 'Internal Server Error' }, (config_1.DEBUG_MODE === 'true' && { originalError: err.message }));
    if (err instanceof zod_1.ZodError) {
        /* The line `statusCode = 422;` is assigning the value 422 to the variable `statusCode`. This
        variable is used to determine the HTTP status code that will be sent in the response. In this
        case, if the error is an instance of `ZodError`, the status code will be set to 422
        (Unprocessable Entity). */
        statusCode = 422;
        data = {
            message: err.issues
                .map((issue) => `${issue.path.join('.')} ${issue.message}`)
                .join(', '),
        };
    }
    res.json(data).status(statusCode);
};
exports.default = errorHandler;
