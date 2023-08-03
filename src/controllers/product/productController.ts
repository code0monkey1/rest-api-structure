import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Product } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
/* The code is setting up the storage configuration for multer, a middleware for handling file uploads
in Node.js. */

//[+] 1.Setting up multer
const storage = multer.diskStorage({
  //** the callback ( cb) receives the second argument as the name of the folder where, on the server the files would be stored
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => cb(null, 'uploads'),
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    //** the unique name is made by combining the data in milliseconds + A random number and the extension of the file given

    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    //** The callback would receive the unique name ( the name of the file ) as the second argument

    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1e6 * 5 }, // 5MB size
}).single('image'); // field name on the frontend form should be : 'image'

const create = async (req: Request, res: Response) => {
  console.log('create function defined');
  handleMultipartData(req, res, async (err) => {
    console.log('handleMultipartData function entered');

    if (err) throw CustomErrorHandler.multerError();

    //[ ]Validate the request and see if the form data is as expected

    const filePath = req.file?.path;

    console.log('file path', filePath);

    res.json();
  });

  res.json();
};

export default {
  create,
};
