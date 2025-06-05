const API_URL = "http://localhost:3001";
import { IUser } from "@/commons/interfaces/users";
import { toast } from "react-toastify";

export const userService = {
  async findAll(): Promise<IUser[]> {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error("Erro ao buscar usuarios!");
      throw new Error(error.message || "Erro ao buscar usuarios!");
    }

    const result: IUser[] = await res.json();

    return result;
  },
};
