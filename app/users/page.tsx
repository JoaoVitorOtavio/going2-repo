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
      console.log("result", result);
      setUsers(result);
    }

    getAllUsers();
  }, []);

  return (
    <div>
      <p>Pagina de listagem de usuarios</p>
      {users.map((user) => (
        <p key={user.id}>
          id:{user.id} nome:{user.name} email:{user.email} role:{user.role}
        </p>
      ))}
      <button type="button" onClick={() => redirect("/")}>
        Voltar para home
      </button>
    </div>
  );
}
