import { CommandHistoryProps } from "../types";

const CommandHistory: React.FC<CommandHistoryProps> = ({ rovers }) => {
  if (!rovers.length) return null;

return (
  <div className="mt-4">
    <h1 className="mb-4 text-2xl font-bold">Commands History</h1>
    {rovers.map(({ position: { x, y, direction }, commands }, index) => (
      <div key={index} className="flex mb-4">
        <div className="flex-1 border p-2">
          <h2 className="font-bold">Command Rover {index + 1}:</h2>
          <p>Position: ({x}, {y})</p>
          <p>Direction: {direction}</p>
          <p>Commands Executed: {commands}</p>
        </div>
        <div className="flex-1 border p-2 ml-2">
          <h2 className="font-bold">Command result Rover {index + 1}:</h2>
          <p>Result Position: ({x}, {y})</p>
          <p>Result Direction: {direction}</p>
          <p>Commands Executed: {commands}</p>
        </div>
      </div>
    ))}
  </div>
);


};

export default CommandHistory;