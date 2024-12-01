import axios from "axios";

const API_URL = "http://localhost:5000/api/rovers";

export const useRoverAPI = () => {
  const token = localStorage.getItem("token");

  const login = async (email: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", data.token);
    return data;
  };

  const register = async (email: string, password: string) => {
    await axios.post(`${API_URL}/register`, { email, password });
  };

  const sendCommands = async (x: number, y: number, direction: string, commands: string) => {
    const { data } = await axios.post(
      `${API_URL}/commands`,
      { position: { x, y, direction }, commands },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  };

  return { login, register, sendCommands };
};
