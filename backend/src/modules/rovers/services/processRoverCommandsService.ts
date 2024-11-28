import User from "../../auth/models/User";
import { Position, RoverCommand } from "../../../shared/types";
import { moveForward, turnLeft, turnRight } from "../roverMovements/roverMovement";
import { LEFT, MOVE, RIGHT } from "../../../constants/directions";
import { RequestError } from "../../../shared/middlewares/errorHandler";

export async function processRoverCommandsService(userId: string, initialPosition: Position, commands: string) {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new RequestError("User not found", 404);
  }

  let currentPosition = { ...initialPosition };

  commands.split('').forEach(command => {
    command = command.toUpperCase();

    if (command === LEFT) {
      currentPosition.direction = turnLeft(currentPosition.direction);
    }
    if (command === RIGHT) {
      currentPosition.direction = turnRight(currentPosition.direction);
    }
    if (command === MOVE) {
      currentPosition = moveForward(currentPosition);
    }
  });

  const newMovement: RoverCommand = {
    position: {
      x: currentPosition.x,
      y: currentPosition.y,
      direction: currentPosition.direction,
    },
    commands,
  };

  user.roverHistory.push(newMovement);
  await user.save();

  return {
    finalPosition: newMovement.position,
    commandsExecuted: newMovement.commands,
    historyCount: user.roverHistory.length,
  };
}
