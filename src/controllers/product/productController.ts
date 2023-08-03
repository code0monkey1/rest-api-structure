import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import z from 'zod';
import { APP_ROOT } from '../../config';
import { Product } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { productSchema } from '../../validation';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

/* The code is setting up the storage configuration for multer, a middleware for handling file uploads
in Node.js. */

// //[+] 1.Setting up multer
// const storage = multer.diskStorage({
//   //** the callback ( cb) receives the second argument as the name of the folder where, on the server the files would be stored
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: DestinationCallback
//   ) => cb(null, 'uploads'),
//   filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
//     //** the unique name is made by combining the data in milliseconds + A random number and the extension of the file given

//     const uniqueName = `${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${path.extname(file.originalname)}`;

//     //** The callback would receive the unique name ( the name of the file ) as the second argument

//     cb(null, uniqueName);
//   },
// });
// //[+]2. Setting up multer function
// const handleMultipartData = multer({
//   storage,
//   limits: { fileSize: 1e6 * 5 }, // 5MB size
// }).single('image'); // field name on the frontend form should be : 'image'

// const create = async (req: Request, res: Response) => {
//   console.log('create function defined');
//   //[+] 3. Submitting form and uploading image using multer function
//   handleMultipartData(req, res, async (err) => {
//     console.log('handleMultipartData function entered');

//     if (err) throw CustomErrorHandler.multerError();

//     //[ ]Validate the request and see if the form data is as expected

//     const body = await req.body;

//     try {
//       const formData = formSchema.parse(body);
//       console.log(formData);
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         console.log(err.issues);
//       }
//     }

//     const filePath = req.file?.path;

//     console.log('file path', filePath);

//     res.json();
//   });

//   res.json();
// };

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    // 3746674586-836534453.png
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single('image'); // 5mb

const create = async (req: Request, res: Response) => {
  // Multipart form data
  handleMultipartData(req, res, async (err) => {
    if (err) {
      throw CustomErrorHandler.multerError(err.message);
    }

    const filePath = req?.file?.path;

    //[+]validate the form data for product fileds
    let product;

    try {
      const body = await req.body;

      product = productSchema.parse(body);
    } catch (error) {
      //[+]Delete the uploaded file in case of validation error

      fs.unlink(`${APP_ROOT}/${filePath}`, (err) => {
        if (err) {
          throw CustomErrorHandler.multerError(
            'could not delete uploaded file after error'
          );
        }
      });

      //[+] Return error response in case error
      return res.status(404).send({
        error: CustomErrorHandler.multerError(),
      });
    }
    //[+] Extract product fields from the body and create a document
    const { name, price, size } = product; // product

    let document = await Product.create({
      name,
      price,
      size,
      image: filePath,
    });
    //[]
    res.status(201).json(document);
  });
};

export default {
  create,
};
