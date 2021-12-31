import { Server } from "socket.io";

import http from "http";

interface Message {
  username: string; // The user who owns this message
  userId: string;
  roomId: string; // Which room this message is published
  date: Date; // Date time in which it was published
  message: string; // The message.
}

export const InitializeMessageSocket = (server: http.Server) => {
  // All socket initialization code goes here...

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("servermessage", (arg: Message) => {
      console.log("client send: ", arg);

      // pass over this message to everyone else
      //io.emit("clientmessage", arg);

      //console.log(socket.rooms.has(arg.roomId), arg.roomId);

      socket.broadcast.in(arg.roomId).emit("clientmessage", arg);
    });

    socket.on("serverregisterroom", (roomName: string) => {
      for (let room in socket.rooms) {
        socket.leave(room);
      }
      socket.join(roomName);
    });
  });

  console.log("Web socket initialized");
};
