import { Request, Response } from "express";
import { Position, RoverCommand } from "../types/typtes";
import { moveForward, turnLeft, turnRight } from "../services/roverService";
import { LEFT, MOVE, RIGHT } from "../constants/directions";
import User from "../models/User";

export function processCommands(req: Request, res: Response): void {
  const { position, commands }: RoverCommand = req.body;
  let currentPosition: Position = position;

  commands.split('').forEach(command => {
    command = command.toUpperCase();

    if (command === LEFT) currentPosition.direction = turnLeft(currentPosition.direction);
    if (command === RIGHT) currentPosition.direction = turnRight(currentPosition.direction);
    if (command === MOVE) currentPosition = moveForward(currentPosition);
  });

  res.json({ finalPosition: currentPosition });
}

export async function addRoverMovement(req: Request, res: Response): Promise<void> {
  const { command, x, y, direction } = req.body;
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized. User ID missing." });
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(400).json({ message: "User not found." });
    return;
  }

  user.roverHistory.push({ x, y, direction, command });
  await user.save();

  res.status(200).json({ message: "Movement added to history." });
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