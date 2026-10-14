
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Agendamento.css";

function Agendamento() {
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarServicos() {
      try {
        const resposta = await api.get("/servicos");
        setServicos(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        setMensagem(
          "Não foi possível carregar os serviços. Faça login e tente novamente."
        );
      }
    }

    carregarServicos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      await api.post("/agendamentos", {
        servico,
        data,
        horario,
      });

      setMensagem("Agendamento solicitado com sucesso!");
      setServico("");
      setData("");
      setHorario("");
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setMensagem(
          "Sua sessão não está válida. Faça login novamente."
        );
      } else {
        setMensagem(
          error.response?.data?.mensagem ||
            "Não foi possível realizar o agendamento."
        );
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-card">
        <button
          type="button"
          className="voltar-button"
          onClick={() => navigate("/")}
        >
          ← Voltar ao início
        </button>

        <p className="agendamento-subtitulo">
          SEU MOMENTO DE CUIDADO
        </p>

        <h1>Agende seu momento</h1>

        <p className="agendamento-descricao">
          Escolha seu serviço, sua data e seu horário.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="campo-agendamento">
            <label htmlFor="servico">Serviço</label>
            <select
              id="servico"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              required
            >
              <option value="">Selecione um serviço</option>

              {servicos.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.nome} — R${" "}
                  {Number(item.preco).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="campo-agendamento">
            <label htmlFor="data">Data desejada</label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              min={new Date().toLocaleDateString("en-CA")}
              required
            />
          </div>

          <div className="campo-agendamento">
            <label htmlFor="horario">Horário</label>
            <select
              id="horario"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required
            >
              <option value="">Selecione um horário</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </select>
          </div>

          <button
            type="submit"
            className="agendar-button"
            disabled={carregando || servicos.length === 0}
          >
            {carregando
              ? "Enviando..."
              : "Solicitar agendamento"}
          </button>
        </form>

        {mensagem && (
          <p className="agendamento-mensagem" role="status">
            {mensagem}
          </p>
        )}
      </section>
    </main>
  );
}

export default Agendamento;
