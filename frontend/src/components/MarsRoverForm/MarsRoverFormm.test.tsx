import { render, screen, fireEvent } from "@testing-library/react";
import MarsRoverForm from "./MarsRoverForm";
import '@testing-library/jest-dom';


describe("MarsRoverForm", () => {
  let mockSetX: jest.Mock, mockSetY: jest.Mock, mockSetDirection: jest.Mock, mockSetCommands: jest.Mock;

  beforeEach(() => {
    mockSetX = jest.fn();
    mockSetY = jest.fn();
    mockSetDirection = jest.fn();
    mockSetCommands = jest.fn();
  });

  test("renders all form fields with initial values", () => {
    render(
      <MarsRoverForm
        x={0}
        setX={mockSetX}
        y={0}
        setY={mockSetY}
        direction="N"
        setDirection={mockSetDirection}
        commands=""
        setCommands={mockSetCommands}
      />
    );

    expect(screen.getByLabelText("X Position (0-3):")).toHaveValue(0);
    expect(screen.getByLabelText("Y Position (0-3):")).toHaveValue(0);
    expect(screen.getByLabelText("Direction:")).toHaveValue("N");
    expect(screen.getByLabelText("Commands:")).toHaveValue("");
  });

  test("updates X position within range", () => {
    render(
      <MarsRoverForm
        x={1}
        setX={mockSetX}
        y={0}
        setY={mockSetY}
        direction="N"
        setDirection={mockSetDirection}
        commands=""
        setCommands={mockSetCommands}
      />
    );

    const xInput = screen.getByLabelText("X Position (0-3):");
    fireEvent.change(xInput, { target: { value: "3" } });

    expect(mockSetX).toHaveBeenCalledWith(3);

    fireEvent.change(xInput, { target: { value: "5" } });
    expect(mockSetX).toHaveBeenCalledWith(3);

    fireEvent.change(xInput, { target: { value: "-1" } });
    expect(mockSetX).toHaveBeenCalledWith(0);
  });

  test("updates Y position within range", () => {
    render(
      <MarsRoverForm
        x={0}
        setX={mockSetX}
        y={2}
        setY={mockSetY}
        direction="N"
        setDirection={mockSetDirection}
        commands=""
        setCommands={mockSetCommands}
      />
    );

    const yInput = screen.getByLabelText("Y Position (0-3):");
    fireEvent.change(yInput, { target: { value: "1" } });

    expect(mockSetY).toHaveBeenCalledWith(1);
  });

  test("updates direction value", () => {
    render(
      <MarsRoverForm
        x={0}
        setX={mockSetX}
        y={0}
        setY={mockSetY}
        direction="N"
        setDirection={mockSetDirection}
        commands=""
        setCommands={mockSetCommands}
      />
    );

    const directionSelect = screen.getByLabelText("Direction:");
    fireEvent.change(directionSelect, { target: { value: "E" } });

    expect(mockSetDirection).toHaveBeenCalledWith("E");
  });

  test("converts commands to uppercase", () => {
    render(
      <MarsRoverForm
        x={0}
        setX={mockSetX}
        y={0}
        setY={mockSetY}
        direction="N"
        setDirection={mockSetDirection}
        commands=""
        setCommands={mockSetCommands}
      />
    );

    const commandsInput = screen.getByLabelText("Commands:");
    fireEvent.change(commandsInput, { target: { value: "mrmrm" } });

    expect(mockSetCommands).toHaveBeenCalledWith("MRMRM");
  });
});
