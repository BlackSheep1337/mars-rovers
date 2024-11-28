import React, { useState } from "react";
import axios from "axios";

const HomePage: React.FC = () => {
  const [commands, setCommands] = useState("");
  const [rovers, setRovers] = useState([]);

  const handleCommandSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/rovers/commands",
        { command: commands },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setRovers(data.rovers);
    } catch (error) {
      alert("Failed to process commands.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Mars Rover Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Commands (e.g., LMLMLMLMM)"
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handleCommandSubmit} className="bg-green-500 text-white p-2">
        Send Commands
      </button>
      <div className="mt-4">
        {rovers.map((rover, index) => (
          <div key={index}>
            <p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
