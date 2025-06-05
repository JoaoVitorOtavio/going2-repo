"use client";
import { authService } from "@/services/authService";
import { useState, SetStateAction, Dispatch, useCallback } from "react";

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

  const handleLogin = useCallback(async () => {
    await authService.login({ email, password });
  }, [email, password]);

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
      <button onClick={() => handleLogin()}>Entrar</button>
    </div>
  );
};

export default Login;
