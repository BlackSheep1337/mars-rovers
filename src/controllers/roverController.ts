import { Request, Response } from "express";
import { Position, RoverCommand } from "../types/typtes";
import { moveForward, turnLeft, turnRight } from "../services/roverService";
import { LEFT, MOVE, RIGHT } from "../constants/directions";

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