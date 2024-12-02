import React, { useState } from "react";
import { useRoverAPI } from "../hooks/useRoverAPI";
import AuthForm from "../components/AuthForm/AuthForm";

const RegisterPage: React.FC = () => {
  const { register } = useRoverAPI();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Registration failed. Try again later.");
    }
  };

  return (
    <AuthForm
      title="Sign up"
      buttonText="Sign up"
      onSubmit={handleRegister}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      linkText="Already have an account?"
      linkHref="/"
    />
  );
};

export default RegisterPage;
