/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Document, Schema, model } from 'mongoose';

// Define the interface for the User document
interface Product extends Document {
  name: string;
  price: number;
  size: string;
  image: string;
}

// Declare the Schema of the Mongo model
const productSchema = new Schema<Product>(
  {
    /* It's important to make the token unique, as that will help in indexing it , which will help us in finding and deleting it *EXTREMELY FAST* from the DB later */
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export default model<Product>('Product', productSchema);
