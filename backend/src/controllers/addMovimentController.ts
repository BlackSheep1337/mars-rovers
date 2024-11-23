import { Request, Response } from 'express';
import User from '../models/User';
import { RoverCommand } from '../types/typtes';

export async function addRoverMovement(req: Request, res: Response): Promise<void> {
  const { command, x, y, direction } = req.body;
  const userId = req.userId;

  if (!command || x === undefined || y === undefined || !direction) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  if (!userId) {
    res.status(401).json({ message: "Unauthorized. User ID missing." });
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(400).json({ message: "User not found." });
    return;
  }

  const newMovement: RoverCommand = { position: { x, y, direction }, commands: command };
  
  try {
    user.roverHistory.push(newMovement);
    await user.save();

    console.log("Updated rover history:", user.roverHistory);
    res.status(200).json({ message: "Movement added to history." });
  } catch (error) {
    console.error("Error saving movement:", error);
    res.status(500).json({ message: "Failed to save movement." });
  }
}