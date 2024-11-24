import { Request, Response } from "express";
import { Position, RoverCommand } from "../types/typtes";
import { moveForward, turnLeft, turnRight } from "../services/roverService";
import { LEFT, MOVE, RIGHT } from "../constants/directions";
import User from "../models/User";

export async function processCommands(req: Request, res: Response): Promise<void> {
  const { position, commands }: RoverCommand = req.body;
  let currentPosition: Position = position;

  const userId = req.userId;

  if (!commands || currentPosition.x === undefined || currentPosition.y === undefined || !currentPosition.direction) {
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

  
  commands.split('').forEach(command => {
    command = command.toUpperCase();
    
    if (command === LEFT) currentPosition.direction = turnLeft(currentPosition.direction);
    if (command === RIGHT) currentPosition.direction = turnRight(currentPosition.direction);
    if (command === MOVE) currentPosition = moveForward(currentPosition);
  });

const newMovement: RoverCommand = {
  position: {
    x: currentPosition.x,
    y: currentPosition.y,
    direction: currentPosition.direction,
  },
  commands,
};

  try {
    user.roverHistory.push(newMovement);
    await user.save();

    res.status(200).json({
      message: "Command processed successfully and saved to history.",
      finalPosition: newMovement.position,
      commandsExecuted: newMovement.commands,
      historyCount: user.roverHistory.length,
    });

    console.log("Updated rover history:", user.roverHistory);
  } catch (error) {
    console.error("Error saving movement:", error);
    res.status(500).json({ message: "Failed to save movement." });
  }
}

export async function getRoverHistory(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  res.status(200).json({ history: user.roverHistory });
}