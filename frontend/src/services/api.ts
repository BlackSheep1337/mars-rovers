import axios from "axios";

const API_URL = "http://localhost:5000/api/rovers";

const api = axios.create({
  baseURL: API_URL,
});

const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/login", { email, password });
  localStorage.setItem("token", data.token);
  setAuthHeader(data.token);
  return data;
};

export const register = async (email: string, password: string) => {
  await api.post("/register", { email, password });
};

export const sendCommands = async (x: number, y: number, direction: string, commands: string) => {
  const { data } = await api.post("/commands", { position: { x, y, direction }, commands });
  return data;
};

export const getHistory = async () => {
  const { data } = await api.get("/history");
  return data;
};

export const deleteHistory = async () => {
  const { data } = await api.delete("/history/delete");
  return data;
};

export { setAuthHeader };
