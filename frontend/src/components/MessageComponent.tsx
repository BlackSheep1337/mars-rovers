import { MessageProps } from "../types";

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  if (!message.text) return null;

  return (
    <p className={`text-lg mt-4 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
      {message.text}
    </p>
  );
};

export default MessageComponent;