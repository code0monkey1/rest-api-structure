/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Document, Schema, model } from 'mongoose';

// Define the interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
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
});

// Export the model
export default model<IUser>('User', userSchema);
