import axios from "axios";

const API_URL = "http://localhost:5000/api/rovers";

export const useRoverAPI = () => {
  const token = localStorage.getItem("token");

  const getHistory = async () => {
    const { data } = await axios.get(`${API_URL}/history`, {
      headers: { Authorization: `Bearer ${token}`}
    });
    return data;
  }

  const deleteHistory = async () => {
    const { data } = await axios.delete(`${API_URL}/history/delete`, {
      headers: { Authorization: `Bearer ${token}`}
    });
    return data;
  }


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

  return { login, register, sendCommands, getHistory, deleteHistory };
};
