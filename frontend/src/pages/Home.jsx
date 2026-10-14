
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="navbar">
        <a className="brand" href="/">Lumière Beauty</a>

        <nav>
          <a href="/servicos">Serviços</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#agendamento">Agendamento</a>
          <a className="login-link" href="/login">Entrar</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <span className="eyebrow">UM RESPIRO SÓ SEU</span>
            <h1>Reserve um momento para cuidar de você.</h1>
            <p>
              Na Lumière Beauty, cada detalhe é pensado para você
              se sentir especial. Encontre seu momento de beleza e bem-estar.
            </p>
            <a className="button" href="#agendamento">
              Agendar horário
            </a>
          </div>

          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1000&q=85"
            alt="Interior elegante de um salão de beleza"
          />
        </section>

        <section className="services-section" id="servicos">
          <span className="eyebrow">NOSSOS CUIDADOS</span>
          <h2>Beleza em cada detalhe</h2>
          <p>Escolha o cuidado que combina com o seu momento.</p>

          <div className="service-cards">
            <article className="service-card">
              <img
                src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=85"
                alt="Cabelo com ondas e finalização"
              />
              <div className="service-content">
                <h3>Cabelos</h3>
                <p>Cortes, tratamentos e finalizações para valorizar sua beleza.</p>
                <a href="/servicos">Conhecer serviços →</a>
              </div>
            </article>

            <article className="service-card">
              <img
                src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=800&q=85"
                alt="Cuidados delicados com as unhas"
              />
              <div className="service-content">
                <h3>Unhas</h3>
                <p>Manicure e cuidados especiais para mãos bem cuidadas.</p>
                <a href="/servicos">Conhecer serviços →</a>
              </div>
            </article>
          </div>
        </section>

        <section className="steps-section" id="como-funciona">
          <span className="eyebrow">SIMPLES ASSIM</span>
          <h2>Seu momento em três passos</h2>

          <div className="steps">
            <article>
              <span>01</span>
              <h3>Escolha o serviço</h3>
              <p>Selecione o cuidado que deseja receber.</p>
            </article>

            <article>
              <span>02</span>
              <h3>Indique seu horário</h3>
              <p>Escolha uma data e um horário para solicitar.</p>
            </article>

            <article>
              <span>03</span>
              <h3>Aguarde o retorno</h3>
              <p>Confira a confirmação do seu agendamento.</p>
            </article>
          </div>
        </section>

        <section className="booking-section" id="agendamento">
          <div className="booking-text">
            <span className="eyebrow">SEU MOMENTO COMEÇA AQUI</span>
            <h2>Vamos reservar um tempo para você?</h2>
            <p>
              Escolha seu serviço e acesse sua conta para continuar
              com a solicitação de agendamento.
            </p>
          </div>

          <div className="booking-card">
            <h3>Agende seu momento</h3>
            <p>Preencha os dados para começar.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/login";
            }}>
              <label htmlFor="servico">Serviço</label>
              <select id="servico" required defaultValue="">
                <option value="" disabled>Selecione um serviço</option>
                <option value="cabelo">Cabelos</option>
                <option value="unhas">Unhas</option>
              </select>

              <div className="form-row">
                <div>
                  <label htmlFor="data">Data desejada</label>
                  <input id="data" type="date" required />
                </div>
                <div>
                  <label htmlFor="horario">Horário</label>
                  <select id="horario" required defaultValue="">
                    <option value="" disabled>Escolha</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                  </select>
                </div>
              </div>

              <button className="button" type="submit">
                Continuar para login
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="/">Lumière Beauty</a>
        <p>Beleza, cuidado e bem-estar em cada detalhe.</p>
        <a href="/login">Acessar minha conta</a>
      </footer>
    </div>
  );
}

export default Home;
