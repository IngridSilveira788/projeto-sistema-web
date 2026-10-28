
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Servicos.css";

function Servicos() {
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const carregarServicos = async () => {
    try {
      const resposta = await api.get("/servicos");
      setServicos(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/servicos", {
        nome,
        descricao,
        preco: Number(preco),
      });

      alert("Serviço cadastrado com sucesso!");

      setNome("");
      setDescricao("");
      setPreco("");

      await carregarServicos();
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
      alert(
        error.response?.data?.mensagem ||
          "Erro ao cadastrar serviço."
      );
    }
  };

  return (
    <main className="servicos-page">
      <div className="servicos-container">
        <button
          type="button"
          className="servicos-voltar"
          onClick={() => navigate("/")}
        >
          ← Voltar ao início
        </button>

        <header className="servicos-cabecalho">
          <p className="servicos-marca">Lumière Beauty</p>
          <h1>Nossos serviços</h1>
          <p className="servicos-descricao">
            Beleza, cuidado e bem-estar em cada detalhe.
          </p>
        </header>

        <section className="servicos-card">
          <h2>Cadastrar serviço</h2>

          <form
            className="servicos-formulario"
            onSubmit={handleSubmit}
          >
            <div className="servicos-campo">
              <label htmlFor="nome">Nome do serviço</label>
              <input
                id="nome"
                type="text"
                placeholder="Ex.: Corte de cabelo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="servicos-campo">
              <label htmlFor="preco">Preço (R$)</label>
              <input
                id="preco"
                type="number"
                placeholder="Ex.: 50,00"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="servicos-campo servicos-campo-largo">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                placeholder="Descreva o serviço oferecido..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="servicos-campo servicos-campo-largo">
              <button type="submit" className="servicos-botao">
                Cadastrar serviço
              </button>
            </div>
          </form>
        </section>

        <section className="servicos-card">
          <h2>Serviços cadastrados</h2>

          {servicos.length === 0 ? (
            <p className="servicos-vazio">
              Nenhum serviço cadastrado ainda.
            </p>
          ) : (
            <div className="servicos-lista">
              {servicos.map((servico) => (
                <article
                  className="servico-item"
                  key={servico._id}
                >
                  <h3>{servico.nome}</h3>

                  <p>
                    {servico.descricao ||
                      "Um momento especial de cuidado para você."}
                  </p>

                  <span className="servico-preco">
                    R${" "}
                    {Number(servico.preco).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Servicos;
