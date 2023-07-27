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
