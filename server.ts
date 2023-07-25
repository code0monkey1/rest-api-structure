import dotenv from 'dotenv';

dotenv.config();

import { APP_PORT } from './config';

import express from 'express';

const server = express();

const PORT = APP_PORT || 3000;

server.listen(PORT, () => {
  console.log('listening to port ', PORT);
});

export default server;
