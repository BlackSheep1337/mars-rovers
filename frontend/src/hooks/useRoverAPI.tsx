import { useEffect } from "react";
import { login, register, sendCommands, getHistory, deleteHistory, setAuthHeader } from "../services/api";

export const useRoverAPI = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthHeader(token);
  }, []);

  return { login, register, sendCommands, getHistory, deleteHistory };
};
