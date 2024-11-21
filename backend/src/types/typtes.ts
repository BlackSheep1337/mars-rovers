import { directions } from "../constants/directions";

export interface Position {
  x: number;
  y: number;
  direction: 'N' | 'E' | 'S' | 'W';
}

export interface RoverCommand {
  position: Position;
  commands: string;
}

export type Direction = typeof directions[number];