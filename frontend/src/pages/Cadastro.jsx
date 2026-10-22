
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post("/auth/register", {
        name: nome,
        email,
        password: senha,
      });

      console.log(resposta.data);

      alert("Cadastro realizado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");

      navigate("/login");
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      alert(
        error.response?.data?.mensagem ||
          "Erro ao realizar cadastro. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <main className="cadastro-page">
      <section className="cadastro-card">
        <button
          type="button"
          className="cadastro-voltar"
          onClick={() => navigate("/")}
        >
          ← Voltar ao início
        </button>

        <p className="cadastro-marca">Lumière Beauty</p>

        <h1>Crie sua conta</h1>

        <p className="cadastro-descricao">
          Estamos felizes em receber você!
          Cadastre-se para reservar seu momento de cuidado.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="cadastro-campo">
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="cadastro-campo">
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

          <div className="cadastro-campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className="cadastro-botao">
            Criar minha conta
          </button>
        </form>

        <p className="cadastro-login">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Cadastro;
