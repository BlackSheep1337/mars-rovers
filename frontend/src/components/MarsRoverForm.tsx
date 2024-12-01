import { MarsRoverFormProps } from "../types";

const MarsRoverForm: React.FC<MarsRoverFormProps> = ({
  x,
  setX,
  y,
  setY,
  direction,
  setDirection,
  commands,
  setCommands,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="x" className="block mb-2">
        X Position (0-3):
        <input
          id="x"
          type="number"
          min="0"
          max="3"
          value={x}
          onChange={(e) => setX(Math.min(Math.max(parseInt(e.target.value) || 0, 0), 3))}
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
          onChange={(e) => setY(Math.min(Math.max(parseInt(e.target.value) || 0, 0), 3))}
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
  );
};

export default MarsRoverForm;
