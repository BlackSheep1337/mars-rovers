import { render, screen } from "@testing-library/react";
import CommandHistory from "./CommandHistory";
import { CommandHistoryProps } from "../../types";

describe("CommandHistory", () => {
  const mockRovers: CommandHistoryProps["rovers"] = [
    {
      command: { x: 1, y: 1, direction: "L" },
      position: { x: 1, y: 2, direction: "N" },
      commands: "LMLMLMLMM",
    },
    {
      command: { x: 1, y: 1, direction: "L" },
      position: { x: 3, y: 3, direction: "E" },
      commands: "MMRMMRMRRM",
    },
  ];

  test("returns null when rovers list is empty", () => {
    render(<CommandHistory command={mockRovers[0].command} rovers={[]} />);
    expect(screen.queryByText("Commands History")).not.toBeInTheDocument();
  });

  test("renders the title when rovers list is not empty", () => {
    render(<CommandHistory command={mockRovers[0].command} rovers={mockRovers} />);
    expect(screen.getByText("Commands History")).toBeInTheDocument();
  });

  test("renders the correct number of rover blocks", () => {
    render(<CommandHistory command={mockRovers[0].command} rovers={mockRovers} />);
    const roverBlocks = screen.getAllByText(/Command Rover/i);
    expect(roverBlocks).toHaveLength(mockRovers.length);
  });

test("renders rover details correctly", () => {
  render(<CommandHistory command={mockRovers[0].command} rovers={mockRovers} />);

  mockRovers.forEach((rover, index) => {
    const roverBlock = screen.getByTestId(`rover-${index}`);
    
    expect(roverBlock).toHaveTextContent(`Command Rover ${index + 1}:`);
    expect(roverBlock).toHaveTextContent(`Position: (${rover.position.x}, ${rover.position.y})`);
    expect(roverBlock).toHaveTextContent(`Direction: ${rover.position.direction}`);
    expect(roverBlock).toHaveTextContent(`Commands Executed: ${rover.commands}`);
  });
});

});
