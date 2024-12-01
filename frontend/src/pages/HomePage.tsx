import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRoverAPI } from "../hooks/useRoverAPI";
import { Rover, Message } from "../types/app";

const HomePage: React.FC = () => {
  const { sendCommands, getHistory, deleteHistory } = useRoverAPI();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [direction, setDirection] = useState<string>("N");
  const [commands, setCommands] = useState<string>("");
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(
    {
      text: "",
      type: "",
    }
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetMessage = ({ text, type }: { text: string; type: string; }) => {
    setMessage({ text, type });
  };

  const validateRange = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));
  
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
    handleSetMessage({text: "", type: ""});
    setLoading(true);

    try {
      const { message } = await sendCommands(x, y, direction, commands);

      getCommandsHistory();
      resetFields();
      handleSetMessage({text: message, type: "success"});

    } catch (err) {
      handleSetMessage({text: "Failed to process commands. Please try again later", type: "error"});
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

      <div className="mb-4">
        <label htmlFor="x" className="block mb-2">
          X Position (0-3):
          <input
            id="x"
            type="number"
            min="0"
            max="3"
            value={x}
            onChange={(e) =>
              setX(validateRange(parseInt(e.target.value) || 0, 0, 3))
            }
            className="border p-2 w-full"
          />
        </label>

        <label htmlFor="y" className="block mb-2">
          Y Position (0-3):
          <input
            id="y"
            type="number"
            min="0"
            max="3"
            value={y}
            onChange={(e) =>
              setY(validateRange(parseInt(e.target.value) || 0, 0, 3))
            }
            className="border p-2 w-full"
          />
        </label>

        <label htmlFor="direction" className="block mb-2">
          Direction:
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="N">North (N)</option>
            <option value="E">East (E)</option>
            <option value="S">South (S)</option>
            <option value="W">West (W)</option>
          </select>
        </label>

        <label htmlFor="commands" className="block mb-2">
          Commands:
          <input
            id="commands"
            type="text"
            placeholder="Enter Commands (e.g., MRRMMRMRRM)"
            value={commands}
            onChange={(e) => setCommands(e.target.value.toUpperCase())}
            className="border p-2 w-full"
          />
        </label>
      </div>
      
      <div>
      <button
        onClick={handleCommandSubmit}
        className="w-40 bg-green-500 text-white p-2"
        disabled={loading}
      >
        {loading ? "Processing..." : "Send Commands"}
        </button>
        {rovers.length ? 
          <button
            onClick={handleDeleteHistory}
            className="w-40 bg-red-500 text-white p-2 ml-4"
            disabled={loading}
          >
            Delete History
          </button> : ""
        }

      </div>

      {message.text && (
        <p className={`text-lg mt-4 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
          {message.text}
        </p>
      )}

      <div className="mt-4">
        {rovers.length ? <h1 className="mb-4 text-2xl font-bold">Commands History</h1>: ""}
        {rovers.map(({position: {x, y, direction}, commands}, index) => (
          <div key={index} className="border p-2 mb-2">
            <p>
              <strong>Rover {index + 1}:</strong>
            </p>
            <p>Position: ({x}, {y})</p>
            <p>Direction: {direction}</p>
            <p>Commands Executed: {commands}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
