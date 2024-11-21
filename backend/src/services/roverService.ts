import {
  directions,
  NORTH,
  EAST,
  SOUTH,
  WEST,
} from "../constants/directions";

import { Position, Direction } from "../types/typtes";

function getNextIndex(currentIndex: number, offset: number): number {
  return (currentIndex + offset + directions.length) % directions.length;
}

export function turnLeft(currentDirection: Direction): Direction {
  const index = directions.indexOf(currentDirection);
  return directions[getNextIndex(index, -1)];
}

export function turnRight(currentDirection: Direction): Direction {
  const index = directions.indexOf(currentDirection);
  return directions[getNextIndex(index, 1)];
}

export function moveForward(position: Position): Position {
  const { x, y, direction } = position;
  switch (direction) {
    case NORTH: return { ...position, y: y + 1 };
    case EAST: return { ...position, x: x + 1 };
    case SOUTH: return { ...position, y: y - 1 };
    case WEST: return { ...position, x: x - 1 };
    default: return position;
  }
}