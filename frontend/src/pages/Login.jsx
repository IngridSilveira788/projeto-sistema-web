import { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post("/auth/login", {
        email: email,
        password: senha,
      });

      console.log(resposta.data);

      alert("Login realizado com sucesso!");

      // Guardar o token para utilizar nas próximas requisições
      localStorage.setItem("token", resposta.data.token);
    } catch (error) {
      console.error(error);
      alert("Email ou senha inválidos.");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;