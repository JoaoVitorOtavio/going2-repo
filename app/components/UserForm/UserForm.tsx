"use client";
import { IUser, UserRole } from "@/commons/interfaces/users";
import { userService } from "@/services/userService";
import { redirect, useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const UserForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const params = useParams();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>(UserRole.USER);

  useEffect(() => {
    if (isEdit) {
      // Note: Se for role user ele so pode editar a si mesmo entao da pra pegar do local storage
      // const user = localStorage.getItem("user");
      async function getUser() {
        const userId = params.id;

        const user: IUser | null = await userService.findOne(Number(userId));

        if (user !== null) {
          setEmail(user.email);
          setName(user.name);
          setPassword(user.password);
          setRole(user.role);
        }
        return user;
      }

      getUser();
    }
  }, [isEdit, params.id]);

  const handleSelectChange = (value: UserRole) => setRole(value);

  const handleChange = (
    value: string,
    stateToSet: Dispatch<SetStateAction<string>>
  ) => {
    console.log(value);
    stateToSet(value);
  };

  const handleSubmit = useCallback(async () => {
    if (isEdit) {
      const userId = params.id;

      await userService.update(Number(userId), {
        email,
        name,
        password,
        role,
      });

      redirect("/users");
    } else {
      await userService.create({ email, name, password, role });
      redirect("/users");
    }
  }, [email, isEdit, name, params.id, password, role]);

  return (
    <div>
      <label htmlFor="name">Nome:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => handleChange(e.target.value, setName)}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => handleChange(e.target.value, setEmail)}
      />
      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => handleChange(e.target.value, setPassword)}
      />
      <label htmlFor="roles">Role:</label>
      <select
        name="roles"
        id="roles"
        onChange={(e) => handleSelectChange(e.target.value as UserRole)}
        value={role}
      >
        <option value={UserRole.ADMIN}>Admin</option>
        <option value={UserRole.MANAGER}>Manager</option>
        <option value={UserRole.USER}>User</option>
      </select>

      <button type="button" onClick={() => handleSubmit()}>
        {isEdit ? "Atualizar" : "Cadastrar"}
      </button>
    </div>
  );
};

export default UserForm;
