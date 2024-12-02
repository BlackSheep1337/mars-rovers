import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRoverAPI } from "../hooks/useRoverAPI";
import { IRover, IMessage } from "../types/app";
import MarsRoverForm from "../components/MarsRoverForm/MarsRoverForm";
import ActionButtons from "../components/ActionButton/ActionButton";
import MessageComponent from "../components/MessageComponent";
import CommandHistory from "../components/CommandHistory";

const HomePage: React.FC = () => {
  const { sendCommands, getHistory, deleteHistory } = useRoverAPI();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [direction, setDirection] = useState<string>("N");
  const [commands, setCommands] = useState<string>("");
  const [rovers, setRovers] = useState<IRover[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessage>(
    {
      text: "",
      type: "",
    }
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetMessage = ({ text, type }: { text: string; type: string; }) => {
    setMessage({ text, type });
  };
  
  const getCommandsHistory = useCallback(async () => {
    const { history: rovers }  = await getHistory();
    setRovers(rovers || []);
  }, [getHistory]);
  
  const handleDeleteHistory = useCallback(async () => {
    const { message } = await deleteHistory();
    setRovers([]);
    handleSetMessage({ text: message, type: "success" });
  }, [deleteHistory]);

  const handleCommandSubmit = async () => {
    handleSetMessage({ text: "", type: "" });
    setLoading(true);

    try {
      const { message } = await sendCommands(x, y, direction, commands);

      getCommandsHistory();
      resetFields();
      handleSetMessage({ text: message, type: "success" });
    } catch (err) {
      handleSetMessage({ text: "Failed to process commands. Please try again later", type: "error" });
    } finally {
      setLoading(false);
    } 
  };

  const resetFields = () => {
    setX(0);
    setY(0);
    setDirection("N");
    setCommands("");
  };

  const timeOutMessage = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setMessage({ text: "", type: "" });
      timeoutRef.current = null;
  }, 3000);
}

  useEffect(() => {
    timeOutMessage();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message.text]);

  useEffect(() => {
    getCommandsHistory();
  }, [getCommandsHistory]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mars Rover Dashboard</h1>
      <MarsRoverForm
        x={x}
        setX={setX}
        y={y}
        setY={setY}
        direction={direction}
        setDirection={setDirection}
        commands={commands}
        setCommands={setCommands}
      />
      <ActionButtons
        loading={loading}
        handleCommandSubmit={handleCommandSubmit}
        handleDeleteHistory={handleDeleteHistory}
        hasHistory={!!rovers.length}
      />
      <MessageComponent message={{ text: message.text, type: message.type }} />
      <CommandHistory rovers={rovers} />
    </div>
  );
};

export default HomePage;
