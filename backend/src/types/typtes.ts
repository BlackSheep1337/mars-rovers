import { directions } from "../constants/directions";
import { Document } from 'mongoose';

export type Direction = typeof directions[number];

export interface Position {
  x: number;
  y: number;
  direction: Direction;
}

export interface RoverCommand {
  position: Position;
  commands: string;
}


export interface IUser extends Document {
  email: string;
  password: string;
  roverHistory: RoverCommand[];
}