import { ActionButtonsProps } from "../types";

const ActionButtons: React.FC<ActionButtonsProps> = ({
  loading,
  handleCommandSubmit,
  handleDeleteHistory,
  hasHistory,
}) => (
  <div>
    <button
      onClick={handleCommandSubmit}
      className="w-40 bg-green-500 text-white p-2"
      disabled={loading}
    >
      {loading ? "Processing..." : "Send Commands"}
    </button>
    {hasHistory && (
      <button
        onClick={handleDeleteHistory}
        className="w-40 bg-red-500 text-white p-2 ml-4"
        disabled={loading}
      >
        Delete History
      </button>
    )}
  </div>
);
export default ActionButtons;