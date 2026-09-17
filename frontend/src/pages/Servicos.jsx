import { useEffect, useState } from "react";
import api from "../services/api";

function Servicos() {
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

      carregarServicos();
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
      alert("Erro ao cadastrar serviço.");
    }
  };

  return (
    <div>
      <h1>Serviços</h1>

      <h2>Cadastrar serviço</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
            <label>Descrição:</label>
            <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Corte masculino tradicional"
            />
        </div>

        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit">Cadastrar serviço</button>
      </form>

      <hr />

      <h2>Serviços cadastrados</h2>

      {servicos.length === 0 ? (
        <p>Nenhum serviço cadastrado.</p>
      ) : (
        <ul>
          {servicos.map((servico) => (
            <li key={servico._id}>
                <strong>{servico.nome}</strong> —{" "}
                {servico.descricao} — R$ {servico.preco}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Servicos;