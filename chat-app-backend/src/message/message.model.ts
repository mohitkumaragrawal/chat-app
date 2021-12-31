import { Model, Document, model, Schema } from "mongoose";

export interface IMessage extends Document {
  userId: string;
  roomId: string;
  message: string;
}

// want to have the timestamps on
export const MessageSchema = new Schema(
  {
    userId: String,
    roomId: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

export const Message: Model<IMessage> = model<IMessage>(
  "message",
  MessageSchema
);
