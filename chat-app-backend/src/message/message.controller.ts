import { IMessage, Message } from "./message.model";

export const newMessage = async (
  userId: string,
  roomId: string,
  message: string
) => {
  const value = new Message({ userId, roomId, message });

  const result = await value.save();

  if (result) {
    // we successfully saved the message to the database.
    return result;
  }
  return null;
};

/**
 * Delete one message by id from the database.
 */
export const deleteMessage = async (messageId: string) => {
  try {
    await Message.findByIdAndDelete(messageId);
  } catch (err) {
    return null; // Message may not exist, i.e, id is invalid is one of the causes.
  }
};

export const getTopMessagesOfRoom = (roomId: string) => {
  Message.find({ roomId }).limit(50);
};
