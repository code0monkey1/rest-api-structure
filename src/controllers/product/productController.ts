import { Product } from '../../models';
//[ ]Setting up multer
import multer from 'multer';
import path from 'path';

/* The code is setting up the storage configuration for multer, a middleware for handling file uploads
in Node.js. */

const storage = multer.diskStorage({
  //** the callback ( cb) receives the second argument as the name of the folder where, on the server the files would be stored
  destination: (req, file, cb: Function) => cb(null, 'uploads'),
  filename: (req, file, cb) => {
    //** the unique name is made by combining the data in milliseconds + A random number and the extension of the file given

    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    //** The callback would receive the unique name ( the name of the file ) as the second argument

    cb(null, uniqueName);
  },
});

const create = async () => {};

export default {
  create,
};
