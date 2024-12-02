import { render, screen } from "@testing-library/react";
import MessageComponent from "./MessageComponent";

describe("MessageComponent", () => {
  test("does not render when message.text is empty", () => {
    render(<MessageComponent message={{ text: "", type: "success" }} />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  test("renders message text when message.text is provided", () => {
    render(<MessageComponent message={{ text: "Operation successful", type: "success" }} />);
    expect(screen.getByText("Operation successful")).toBeInTheDocument();
  });

  test("applies text-red-600 class for error messages", () => {
    render(<MessageComponent message={{ text: "An error occurred", type: "error" }} />);
    const message = screen.getByText("An error occurred");
    expect(message).toHaveClass("text-red-600");
  });

  test("applies text-green-600 class for success messages", () => {
    render(<MessageComponent message={{ text: "Operation successful", type: "success" }} />);
    const message = screen.getByText("Operation successful");
    expect(message).toHaveClass("text-green-600");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<MessageComponent message={{ text: "Snapshot test", type: "success" }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
