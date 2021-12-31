import { Router, Request, Response } from "express";

import * as RoomController from "./room.controller";
import { Room } from "./room.model";

const RoomRoute = Router();

RoomRoute.get("/", RoomController.getAllRooms);

RoomRoute.get("/:id", async (req: Request, res: Response) => {
  const roomId = req.params.id;
  const room = await Room.findById(roomId);
  if (room) {
    res.status(200).json(room).end();
  } else {
    res.status(404).json({
      message: "Room with a given id doesn't exist",
    });
  }
});

RoomRoute.post("/", RoomController.createRoom);

export default RoomRoute;
