import dotenv from 'dotenv';

dotenv.config();

import { APP_PORT } from './config';

import express from 'express';
import routes from './src/routes';

const server = express();

server.use(express.json());

server.use('/api', routes);

const PORT = APP_PORT || 3000;

server.listen(PORT, () => {
  console.log('listening to port ', PORT);
});

export default server;
