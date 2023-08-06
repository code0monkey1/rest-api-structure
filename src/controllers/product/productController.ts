import { NextFunction, Request, Response } from 'express';

import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { APP_ROOT } from '../../config';
import { Product } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { productValidator } from '../../validation';
//[+]1. Setting up multer function
/* The `storage` variable is an instance of `multer.diskStorage`, which is a storage engine for
`multer` that allows you to define how files should be stored on the disk. */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    /* The `uniqueFileName` variable is generating a unique filename for the uploaded file. It combines
    the current timestamp (`Date.now()`), a random number (`Math.round(Math.random() * 1e9)`), and
    the file's original extension (`path.extname(file.originalname)`). This ensures that each
    uploaded file has a unique name to avoid conflicts and overwriting existing files. */
    const uniqueFileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    // eg : 3746674586-836534453.png
    cb(null, uniqueFileName);
  },
});

//[+]2. Setting up multer function
const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single('image'); // 5mb

//[+] Function to create a new product
//! doing normal  async error handling using next ,as multer seems to not work with express async errors
// eslint-disable-next-line @typescript-eslint/require-await
const create = async (req: Request, res: Response, next: NextFunction) => {
  // Multipart form data

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  handleMultipartData(req, res, async (err) => {
    try {
      let product;

      if (err)
        return next(CustomErrorHandler.multerError('❌ Error at multer start'));

      if (!req.file) {
        return next(
          CustomErrorHandler.multerError(
            '❌ File Not Present in Multer Request'
          )
        );
      }

      const filePath = req.file.path;

      console.log('filePath ', filePath);

      //[+]validate the form data for product fileds

      //[-] You need to go to the `server.ts` file and apply the middleware to parse multipart form

      try {
        const body: unknown = await req.body;
        console.log('product body', JSON.stringify(body, null, 2));
        //[+] Extract product fields from the body and create a Product document
        const { name, price, size } = productValidator.parse(body);
        console.log(
          '🚀 ~ file: productController.ts:56 ~ handleMultipartData ~ const { name, price, size }:',
          name,
          price,
          size
        );

        product = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });

        //[+]Delete the uploaded file in case of validation error
      } catch (err) {
        //[+] Return error res in case error
        fs.unlink(`${APP_ROOT}/${filePath}`, (err) => {
          if (err)
            throw CustomErrorHandler.multerError('Could not delete file');
          else console.log('✅ Uploaded file deleted');
        });
        return next(CustomErrorHandler.multerError((err as Error).message));
      }

      return res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  });
};

const update = async (req: Request, res: Response) => {
  //[ ] 1.Find the product

  const id = req.params.id;

  //[ ] 2. ensure that the user has the auth to update the product
  //?? Already checked using admin middleware

  // [ ]2. If Not found return product not found
  const product = await Product.findById(id);

  if (!product) throw CustomErrorHandler.notFound('Product Not Found');
  // [ ]3. If found use put to parse the request and update the product

  const updatedProduct = await Product.findOneAndUpdate(
    { id }
    // { ...req.body }
  );

  // [ ]4. Return the updated product to the frontend

  console.log(updatedProduct);

  res.status(201).json(updatedProduct);
};

export default {
  create,
  update,
};
