import { Document, Schema, model } from 'mongoose';

// Define the interface for the User document
const enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
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
      enum: [Role.ADMIN, Role.USER],
      default: Role.USER,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export default model<IUser>('User', userSchema);
