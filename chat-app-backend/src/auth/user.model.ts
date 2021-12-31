import { Schema, model, Model, Document } from "mongoose";

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  pass: String, // This is a hash
});

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
}

export const User: Model<IUser> = model<IUser>("user", UserSchema);
