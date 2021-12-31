import { Model, Document, model, Schema } from "mongoose";

export interface IRoom extends Document {
  title: string;
  subtitle: string;
  logoUrl: string;
}

// Title of the room is unique
export const RoomSchema = new Schema({
  title: { type: String, unique: true, required: true },
  subtitle: String,
  logoUrl: String,
});

export const Room: Model<IRoom> = model<IRoom>("room", RoomSchema);
