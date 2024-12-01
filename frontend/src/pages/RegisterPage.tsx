import React, { useState } from "react";
import { useRoverAPI } from "../hooks/useRoverAPI";

const RegisterPage: React.FC = () => {
  const { register } = useRoverAPI();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    <div className="flex justify-center mt-60">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>
        <form onSubmit={handleRegister} className="bg-white shadow-md rounded-md p-8 space-y-4">
          <label className="text-sm text-gray-800" htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 h-6 p-4 m-2"
          />
          <label className="text-sm text-gray-800" htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 h-6 p-4 m-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Sign up
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="text-sm text-center mt-4">
            <a href="/">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
