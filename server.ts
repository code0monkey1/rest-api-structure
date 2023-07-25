import dotenv from 'dotenv';

dotenv.config();

import { APP_PORT } from './config';

import express from 'express';
import errorHandler from './middlewares/errorHandler';
import routes from './src/routes';

const server = express();

server.use(express.json());

server.use('/api', routes);

/* `server.use(errorHandler);` is adding the `errorHandler` middleware to the Express server. */

//this is the last middle ware to be added , as it catches all async errors
server.use(errorHandler);

const PORT = APP_PORT || 3000;

server.listen(PORT, () => {
  console.log('listening to port ', PORT);
});

export default server;
