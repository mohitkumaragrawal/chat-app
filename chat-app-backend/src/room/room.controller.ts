import { Request, Response } from "express";
import { Room } from "./room.model";

export const createRoom = async (req: Request, res: Response) => {
  const title: string | undefined = req.body.title;
  const subtitle: string | undefined = req.body.subtitle;
  const logoUrl: string | undefined = req.body.logoUrl;

  if (title && subtitle && logoUrl) {
    const room = new Room({
      title,
      subtitle,
      logoUrl,
    });

    const value = await room.save();

    if (!value) {
      // unable to save the room.
      res.status(500).end();
    } else {
      res.status(200).json(value).end();
    }
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  const rooms = await Room.find();
  if (rooms) {
    res.status(200).json(rooms).end();
  } else {
    res.status(500).end();
  }
};
