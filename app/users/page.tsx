"use client";
import { IUser } from "@/commons/interfaces/users";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function getAllUsers() {
      const result = await userService.findAll();
      setUsers(result);
    }

    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Usuários</h1>

      <div className="space-y-4 max-w-4xl mx-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="space-y-1">
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => redirect(`/update/user/${user.id}`)}
                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => userService.delete(user.id)}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => redirect("/")}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}
