import { directions, Direction } from "../constants/directions";
import { Position } from "../types/typtes";

export function turnLeft(currentDirection: Direction): Direction {
  const index = directions.indexOf(currentDirection);
  return directions[(index - 1 + 4) % 4];
}

export function turnRight(currentDirection: Direction): Direction {
  const index = directions.indexOf(currentDirection);
  return directions[(index + 1) % 4];
}

export function moveForward(position: Position): Position {
  const { x, y, direction } = position;
  switch (direction) {
    case 'N': return { ...position, y: y + 1 };
    case 'E': return { ...position, x: x + 1 };
    case 'S': return { ...position, y: y - 1 };
    case 'W': return { ...position, x: x - 1 };
    default: return position;
  }
}