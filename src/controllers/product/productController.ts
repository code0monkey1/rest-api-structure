import { Request, Response } from 'express';
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

const create = (req: Request, res: Response) => {
  // Multipart form data

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  handleMultipartData(req, res, async (err) => {
    if (err) throw CustomErrorHandler.multerError((err as Error).message);

    const filePath = req?.file?.path;
    console.log('filePath', filePath);

    //[+]validate the form data for product fileds

    //[-] You need to go to the `server.ts` file and apply the middleware to parse multipart forms
    const body: unknown = await req.body;

    let product;

    try {
      product = productValidator.parse(body);
      //[+]Delete the uploaded file in case of validation error
    } catch (err: unknown) {
      fs.unlink(`${APP_ROOT}/${filePath}`, (err) => {
        if (err) throw CustomErrorHandler.multerError('Could not delete file');
        else console.log('Uploaded file deleted');
      });
      throw CustomErrorHandler.multerError((err as Error).message);
    }

    //[+] Return error res in case error

    //[+] Extract product fields from the body and create a Product document

    const { name, price, size } = product; // product

    const document = new Product({
      name,
      price,
      size,
      image: filePath,
    });

    const savedProduct = await document.save();

    //[]
    res.status(201).json(savedProduct);
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
