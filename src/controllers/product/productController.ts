import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { Document } from 'mongoose';
import multer from 'multer';
import path from 'path';
import { APP_ROOT } from '../../config';
import { Product } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { productValidator } from '../../validation';
interface IProductDocument extends Document {
  _doc: {
    image: string;
  };
}
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

// eslint-disable-next-line @typescript-eslint/require-await
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    handleMultipartData(req, res, async (err) => {
      try {
        let product;
        let filePath;

        if (err)
          return next(
            CustomErrorHandler.multerError('❌ Error at multer start')
          );
        //[ ]1. If file is present,only then get it's path ( file is optional in update)
        if (req.file) {
          filePath = req.file.path;
        }

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
          const id = req.params.id;

          product = await Product.findOneAndUpdate(
            { id },
            {
              name,
              price,
              size,
              ...(req.file && { image: filePath }), // ?this will include the updated image ,if the image is present in the  update request
            },
            { new: true } //? will get updated data in response
          );
          return res.status(201).json(product);
          //[+]Delete the uploaded file in case of validation error
        } catch (err) {
          //[+] Return error res in case error

          //[ ] To do only in case file is present , else no need to remove
          if (req.file) {
            fs.unlink(`${APP_ROOT}/${filePath}`, (err) => {
              if (err)
                throw CustomErrorHandler.multerError('Could not delete file');
              else console.log('✅ Uploaded file deleted');
            });
            return next(CustomErrorHandler.multerError((err as Error).message));
          }
        }
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //[+]1. First get the product with the specified ID

    const id = req.params.id;

    const product = (await Product.findByIdAndDelete(id)) as IProductDocument;

    if (!product)
      return next(
        CustomErrorHandler.notFound(`Product with id:${id} not found!`)
      );

    //[] delete image from the server (or other storage location)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    //[+]2. Get the path of the image file stored in the db ( before getter are invoked and the dynamic APP_URL is attached)

    const filePath = `${APP_ROOT}/${product._doc.image}`;

    console.log(filePath);

    fs.unlink(filePath, (err) => {
      if (err) {
        return next(CustomErrorHandler.multerError('❌ Could not delete file'));
      } else console.log('✅ Uploaded file deleted');
    });

    res.json(product);
    //[+] 2. Delete the product if present , if not , raise error
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: Request, res: Response) => {
  const products = await Product.find()
    .select('-updatedAt -__v')
    .sort({ id: -1 }); //? ascending order

  res.json(products);
};

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product)
    throw CustomErrorHandler.notFound(`product with id ${id} not found`);

  res.json(product);
};

export default {
  create,
  update,
  remove,
  getAll,
  getOne,
};
