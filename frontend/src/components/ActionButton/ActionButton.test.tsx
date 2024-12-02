import { render, screen, fireEvent } from "@testing-library/react";
import ActionButtons from "./ActionButton";

describe("ActionButtons", () => {
  const mockHandleCommandSubmit = jest.fn();
  const mockHandleDeleteHistory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Send Commands button with the correct text", () => {
    render(
      <ActionButtons
        loading={false}
        handleCommandSubmit={mockHandleCommandSubmit}
        handleDeleteHistory={mockHandleDeleteHistory}
        hasHistory={false}
      />
    );

    const sendCommandsButton = screen.getByText("Send Commands");
    expect(sendCommandsButton).toBeInTheDocument();
    expect(sendCommandsButton).not.toBeDisabled();
  });

  test("displays 'Processing...' on the Send Commands button when loading", () => {
    render(
      <ActionButtons
        loading={true}
        handleCommandSubmit={mockHandleCommandSubmit}
        handleDeleteHistory={mockHandleDeleteHistory}
        hasHistory={false}
      />
    );

    const sendCommandsButton = screen.getByText("Processing...");
    expect(sendCommandsButton).toBeInTheDocument();
    expect(sendCommandsButton).toBeDisabled();
  });

  test("renders the Delete History button when hasHistory is true", () => {
    render(
      <ActionButtons
        loading={false}
        handleCommandSubmit={mockHandleCommandSubmit}
        handleDeleteHistory={mockHandleDeleteHistory}
        hasHistory={true}
      />
    );

    const deleteHistoryButton = screen.getByText("Delete History");
    expect(deleteHistoryButton).toBeInTheDocument();
    expect(deleteHistoryButton).not.toBeDisabled();
  });

  test("does not render the Delete History button when hasHistory is false", () => {
    render(
      <ActionButtons
        loading={false}
        handleCommandSubmit={mockHandleCommandSubmit}
        handleDeleteHistory={mockHandleDeleteHistory}
        hasHistory={false}
      />
    );

    const deleteHistoryButton = screen.queryByText("Delete History");
    expect(deleteHistoryButton).not.toBeInTheDocument();
  });

  test("calls handleCommandSubmit when Send Commands button is clicked", () => {
    render(
      <ActionButtons
        loading={false}
        handleCommandSubmit={mockHandleCommandSubmit}
        handleDeleteHistory={mockHandleDeleteHistory}
        hasHistory={false}
      />
    );

    const sendCommandsButton = screen.getByText("Send Commands");
    fireEvent.click(sendCommandsButton);
    expect(mockHandleCommandSubmit).toHaveBeenCalledTimes(1);
  });

  test("calls handleDeleteHistory when Delete History button is clicked", () => {
    render(
      <ActionButtons
        loading={false}
        handleCommandSubmit={mockHandleCommandSubmit}
        handleDeleteHistory={mockHandleDeleteHistory}
        hasHistory={true}
      />
    );

    const deleteHistoryButton = screen.getByText("Delete History");
    fireEvent.click(deleteHistoryButton);
    expect(mockHandleDeleteHistory).toHaveBeenCalledTimes(1);
  });

  test("disables both buttons when loading is true", () => {
    render(
      <ActionButtons
        loading={true}
        handleCommandSubmit={mockHandleCommandSubmit}
        handleDeleteHistory={mockHandleDeleteHistory}
        hasHistory={true}
      />
    );

    const sendCommandsButton = screen.getByText("Processing...");
    const deleteHistoryButton = screen.getByText("Delete History");

    expect(sendCommandsButton).toBeDisabled();
    expect(deleteHistoryButton).toBeDisabled();
  });
});
