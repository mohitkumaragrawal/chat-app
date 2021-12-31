import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";

import AuthRoute from "./auth/auth.route";
import RoomRoute from "./room/room.route";

import { InitializeMessageSocket } from "./message/message.socket";

// Connect to database
mongoose
  .connect("mongodb://localhost/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to Database");

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Configure middlewares
    app.use(express.json());
    app.use(cors());

    app.use((req, res, next) => {
      next();
    });

    // Configure routes
    app.use("/api/auth", AuthRoute);
    app.use("/api/room", RoomRoute);

    // Finally start the server
    const server = http.createServer(app);

    InitializeMessageSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  });
