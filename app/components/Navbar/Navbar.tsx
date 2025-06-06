"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setToken } from "@/store/slices/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user")!);

  const userToken = useSelector((state: RootState) => state.user.token);

  const [localToken, setLocalToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setLocalToken(storedToken);
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    redirect("/");
  }, [dispatch]);

  if (!userToken && !localToken) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Meu Sistema</div>

        {/* Ícone Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/users" className="hover:text-gray-200">
            Lista de Usuários
          </Link>
          <Link href="/create/user" className="hover:text-gray-200">
            Criar Usuário
          </Link>
          <Link
            href={`/update/user/${user.id}/password`}
            className="hover:text-gray-200"
          >
            Mudar Senha
          </Link>
          <span
            className="cursor-pointer hover:text-gray-200"
            onClick={() => handleLogout()}
          >
            Sair
          </span>
        </div>
      </div>

      {/* Links (Mobile) */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-4 pb-4 space-y-2">
          <Link href="/users" className="block hover:text-gray-200">
            Lista de Usuários
          </Link>
          <Link href="/create/user" className="block hover:text-gray-200">
            Criar Usuário
          </Link>
          <Link
            href={`/update/user/${user.id}/password`}
            className="block hover:text-gray-200"
          >
            Mudar Senha
          </Link>
          <span
            className="cursor-pointer hover:text-gray-200"
            onClick={() => handleLogout()}
          >
            Sair
          </span>
        </div>
      )}
    </nav>
  );
}
