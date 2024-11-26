import { Direction, Position } from "../../../shared/types"; // Assuming 'Direction' is already correctly typed
import { NORTH, EAST, SOUTH, WEST } from "../../../constants/directions";

export function moveForward(position: Position ): Position {
  switch (position.direction) {
    case NORTH:
      position.y += 1;
      break;
    case EAST:
      position.x += 1;
      break;
    case SOUTH:
      position.y -= 1;
      break;
    case WEST:
      position.x -= 1;
      break;
  }
  return position;
}

export function turnLeft(direction: Direction): Direction {
  switch (direction) {
    case NORTH: return WEST;
    case EAST: return NORTH;
    case SOUTH: return EAST;
    case WEST: return SOUTH;
  }
}

export function turnRight(direction: Direction): Direction {
  switch (direction) {
    case NORTH: return EAST;
    case EAST: return SOUTH;
    case SOUTH: return WEST;
    case WEST: return NORTH;
  }
}
