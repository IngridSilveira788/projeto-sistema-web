
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post("/auth/login", {
        email,
        password: senha,
      });

      // Guardar o token antes de navegar para outra página
      localStorage.setItem("token", resposta.data.token);

      alert("Login realizado com sucesso!");
      navigate("/agendamento");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert(
        error.response?.data?.mensagem ||
          "E-mail ou senha inválidos."
      );
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <button
          type="button"
          className="login-voltar"
          onClick={() => navigate("/")}
        >
          ← Voltar ao início
        </button>

        <p className="login-marca">Lumière Beauty</p>

        <h1>Bem-vinda!</h1>

        <p className="login-descricao">
          Entre na sua conta e reserve um momento para cuidar de você.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="login-entrar">
            Entrar na minha conta
          </button>
        </form>

        <p className="login-cadastro">
          Ainda não tem conta?{" "}
          <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
