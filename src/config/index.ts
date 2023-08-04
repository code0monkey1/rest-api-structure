/* The code `export const { APP_PORT } = process.env;` is exporting a constant variable `APP_PORT` from
the `process.env` object. */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export const {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  JWT_SECRET,
  REFRESH_TOKEN_SECRET,
  APP_ROOT = path.resolve(__dirname, '../../'),
} = process.env;
