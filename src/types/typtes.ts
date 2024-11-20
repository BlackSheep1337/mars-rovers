export interface Plateau {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
  direction: 'N' | 'E' | 'S' | 'W';
}

export interface RoverCommand {
  plateau: Plateau;
  position: Position;
  commands: string;
}