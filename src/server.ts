import dotenv from 'dotenv';
import 'express-async-errors';
dotenv.config();

import { APP_PORT } from './config';

import express from 'express';
import { connectToDb } from './db';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

//Connect to MongoDb Database
(async () => {
  // Code to execute
  await connectToDb();
})().catch((err) => {
  console.error(err);
});

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
