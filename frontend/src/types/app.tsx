interface Rover {
  position: {
    x: number;
    y: number;
    direction: string;
  };
  commands: string;
}

type Message = {
  text: string;
  type: string;
}

export {
  Rover,
  Message,
}