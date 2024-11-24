import { Request, Response } from "express";
import User from "../models/User";

export async function getRoverHistory(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  res.status(200).json({ history: user.roverHistory });
}