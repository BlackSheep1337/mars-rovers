import axios from 'axios';
import React, { useState } from 'react'

const CreateAccountPage = () => {
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
    <div className="flex justify-center mt-60">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sing up</h2>
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded-md p-8 space-y-4">
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
            Sing up
          </button>

          <div className="text-sm text-center mb-4">
            <a href="/">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountPage