# Lumière Beauty

Sistema web de agendamento de serviços de beleza, desenvolvido como projeto acadêmico. A plataforma busca facilitar a visualização dos serviços oferecidos e o agendamento de atendimentos, com uma interface elegante e intuitiva.

## Sobre o projeto

O **Lumière Beauty** é uma aplicação web voltada para salões de beleza, permitindo que os usuários conheçam os serviços disponíveis e realizem agendamentos. O projeto utiliza uma arquitetura separada entre frontend e backend, com persistência de dados em banco de dados MongoDB.

## Interface do sistema

### Tela inicial

![Tela inicial do Lumière Beauty](docs/prints/tela-inicial.png)

> Adicione uma captura de tela real da interface no caminho `docs/prints/tela-inicial.png`.

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| React | Construção da interface do usuário |
| JavaScript | Lógica da aplicação |
| CSS | Estilização das páginas |
| Node.js | Ambiente de execução do backend |
| Express | Criação da API |
| MongoDB | Armazenamento dos dados |


## Como executar o projeto

### Pré-requisitos

- Node.js e npm instalados.
- Acesso a um banco MongoDB configurado.
- Git instalado para clonar o repositório.

### 1. Clone o repositório

```bash
git clone https://github.com/IngridSilveira788/projeto-sistema-web.git
cd projeto-sistema-web
```

### 2. Configure e execute o backend

Abra um terminal na pasta do backend:

```bash
cd backend
npm install
```

Configure as variáveis de ambiente necessárias no arquivo `.env`, seguindo a estrutura utilizada pelo projeto. Não compartilhe nem envie esse arquivo ao repositório.

Inicie o servidor:

```bash
node src/server.js
```

### 3. Execute o frontend

Abra outro terminal, na raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

Acesse no navegador o endereço informado pelo Vite no terminal.

## 🌐 Endereços de acesso

| Serviço | Endereço |
|---|---|
| Frontend | `http://localhost:5173` |
| API | `http://localhost:3000/api` |


## Funcionalidades do sistema

- Visualização dos serviços de beleza.
- Cadastro e autenticação de usuários.
- Agendamento de serviços.
- Integração entre frontend e backend.
- Persistência das informações no MongoDB.


