/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Document, Schema, model } from 'mongoose';

// Define the interface for the User document
export interface IRefreshToken extends Document {
  token: string;
}

// Declare the Schema of the Mongo model
const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    /* It's important to make the token unique, as that will help in indexing it , which will help us in finding and deleting it *EXTREMELY FAST* from the DB later */
    token: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

// Export the model
export default model<IRefreshToken>('RefreshToken', refreshTokenSchema);
