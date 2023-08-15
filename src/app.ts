import express from 'express';
import 'express-async-errors';
//rest

import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

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
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api', routes);
//[+] Define url to serve static files
//? To server any static files in your project , make a url eg :'/uploads , and then use `express.static('folder_name")` to make the file available through the api .
//! Creating any extra api endpoints for static files in not required ,except the former step
app.use('/uploads', express.static('uploads'));
/* `server.use(errorHandler);` is adding the `errorHandler` middleware to the Express server. */

//this is the last middle ware to be added , as it catches all async errors

app.use(errorHandler);

export default app;
