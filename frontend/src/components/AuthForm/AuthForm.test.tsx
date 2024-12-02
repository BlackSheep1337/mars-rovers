import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./AuthForm";
import React from "react";

describe("AuthForm Component", () => {
  const mockOnSubmit = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();

  const defaultProps = {
    title: "Login",
    buttonText: "Sign In",
    onSubmit: mockOnSubmit,
    email: "",
    password: "",
    setEmail: mockSetEmail,
    setPassword: mockSetPassword,
    error: "",
    linkText: "Forgot Password?",
    linkHref: "/reset-password",
  };

  test("renders all form elements with initial values", () => {
    render(<AuthForm {...defaultProps} />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toHaveAttribute(
      "href",
      "/reset-password"
    );
  });

  test("updates email and password fields on change", () => {
    render(<AuthForm {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(mockSetEmail).toHaveBeenCalledWith("test@test.com");
    expect(mockSetPassword).toHaveBeenCalledWith("password123");
  });

  test("calls onSubmit when form is submitted", () => {
    render(<AuthForm {...defaultProps} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  test("displays error message when error prop is passed", () => {
    render(<AuthForm {...defaultProps} error="Invalid credentials" />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    expect(screen.getByText("Invalid credentials")).toHaveClass("text-red-500");
  });

  test("renders link with correct text and href", () => {
    render(<AuthForm {...defaultProps} />);

    const link = screen.getByText("Forgot Password?");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/reset-password");
  });
});
