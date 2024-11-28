import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/rovers/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center p-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
