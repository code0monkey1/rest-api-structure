/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Document, Schema, model } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'customer',
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export default model<IUser>('User', userSchema);
