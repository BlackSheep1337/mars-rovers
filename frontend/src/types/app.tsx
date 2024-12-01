interface IRover {
  position: {
    x: number;
    y: number;
    direction: string;
  };
  commands: string;
}

interface IMessage {
  text: string;
  type: string;
}

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  error?: string;
  linkText: string;
  linkHref: string;
}

interface MarsRoverFormProps {
  x: number;
  setX: (value: number) => void;
  y: number;
  setY: (value: number) => void;
  direction: string;
  setDirection: (value: string) => void;
  commands: string;
  setCommands: (value: string) => void;
}

interface ActionButtonsProps {
  loading: boolean;
  handleCommandSubmit: () => void;
  handleDeleteHistory: () => void;
  hasHistory: boolean;
}

interface MessageProps {
  message: IMessage;
}

interface CommandHistoryProps {
  rovers: IRover[];
}

export {
  IRover,
  IMessage,
  AuthFormProps,
  MarsRoverFormProps,
  ActionButtonsProps,
  MessageProps,
  CommandHistoryProps,
}