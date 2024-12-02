import React, { useState } from "react";
import { useRoverAPI } from "../hooks/useRoverAPI";
import AuthForm from "../components/AuthForm/AuthForm";

const LoginPage: React.FC = () => {
  const { login } = useRoverAPI();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      window.location.href = "/home";
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <AuthForm
      title="Log in"
      buttonText="Login"
      onSubmit={handleLogin}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      linkText="or, Sign up"
      linkHref="/register"
    />
  );
};

export default LoginPage;
