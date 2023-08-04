import express from 'express';
require('express-async-errors');

//rest
import { APP_PORT } from './config';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import server from './server';

//[+] Connect to db

import { connectToDb } from './db';

//Connect to MongoDb Database
(async () => {
  // Code to execute
  await connectToDb();
})().catch((err) => {
  console.error(err);
});

//[+] Middleware to parse multipart forms
/* `server.use(express.urlencoded({ extended: false }));` is adding the middleware to parse URL-encoded
data to the Express server. */
server.use(express.urlencoded({ extended: false }));

server.use(express.json());

const PORT = APP_PORT || 3000;

server.use('/api', routes);
/* `server.use(errorHandler);` is adding the `errorHandler` middleware to the Express server. */

//this is the last middle ware to be added , as it catches all async errors

server.use(errorHandler);

server.listen(PORT, () => {
  console.log('listening to port ', PORT);
});
