"use client";
import { useState, SetStateAction, Dispatch } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (
    value: string,
    stateToSet: Dispatch<SetStateAction<string>>
  ) => {
    console.log(value);
    stateToSet(value);
  };

  return (
    <div>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => handleChange(e.target.value, setEmail)}
        placeholder="Digite seu email"
      />
      <label>Senha</label>
      <input
        value={password}
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => handleChange(e.target.value, setPassword)}
      />
    </div>
  );
};

export default Login;
