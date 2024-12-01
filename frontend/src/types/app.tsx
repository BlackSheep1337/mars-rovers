interface Rover {
  position: {
    x: number;
    y: number;
    direction: string;
  };
  commands: string;
}

export {
  Rover,
}