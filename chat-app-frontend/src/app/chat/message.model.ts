export interface Message {
  username: string; // The user who owns this message
  userId: string;
  roomId: string; // Which room this message is published
  date: Date; // Date time in which it was published
  message: string; // The message.
}
