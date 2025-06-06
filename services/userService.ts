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
  async create(user: Partial<IUser>): Promise<IUser> {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const result = await res.json();

        toast.error(result.message || "Erro ao criar usuário");
        throw new Error(result.message || "Erro ao criar usuário");
      }

      const result: IUser = await res.json();

      toast.success("Usuario criado com sucesso!");
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw new Error(error.message || "Erro ao criar usuario!");
      } else {
        toast.error("Erro ao criar usuario!");
        throw new Error("Erro ao criar usuario!");
      }
    }
  },
};
