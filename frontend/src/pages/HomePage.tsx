import React, { useState } from "react";
import { useRoverAPI } from "../hooks/useRoverAPI";
import { Rover } from "../types/app";

const HomePage: React.FC = () => {
  const { sendCommands } = useRoverAPI();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState("N");
  const [commands, setCommands] = useState("");
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateRange = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const handleCommandSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await sendCommands(x, y, direction, commands);
      setRovers(data.rovers || []);
      resetFields();
    } catch (err) {
      setError("Failed to process commands. Please try again later.");
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

      <button
        onClick={handleCommandSubmit}
        className="bg-green-500 text-white p-2"
        disabled={loading}
      >
        {loading ? "Processing..." : "Send Commands"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        {rovers.map((rover, index) => (
          <div key={index} className="border p-2 mb-2">
            <p>
              <strong>Rover {index + 1}:</strong>
            </p>
            <p>Position: ({rover.position.x}, {rover.position.y})</p>
            <p>Direction: {rover.position.direction}</p>
            <p>Commands Executed: {rover.commands}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
