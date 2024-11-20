import { EAST, NORTH, SOUTH, WEST } from '../src/constants/directions';
import { turnLeft, turnRight, moveForward } from '../src/services/roverService';
import { Position } from '../src/types/typtes';

describe('Rover Service Tests', () => {
  it('should turn NORTH to WEST when turning left', () => {
    expect(turnLeft(NORTH)).toBe(WEST);
  });

  it('should turn SOUTH to WEST when turning right', () => {
    expect(turnRight(SOUTH)).toBe(WEST);
  });

  it('should move NORTH correctly', () => {
    const position: Position = { x: 0, y: 0, direction: NORTH };
    expect(moveForward(position)).toEqual({ x: 0, y: 1, direction: NORTH });
  });

  it('should turn WEST to SOUTH when turning left', () => {
    expect(turnLeft(WEST)).toBe(SOUTH);
  });

  it('should move EAST correctly', () => {
    const position: Position = { x: 0, y: 0, direction: EAST };
    expect(moveForward(position)).toEqual({ x: 1, y: 0, direction: EAST });
  });
});
