# projeto-sistema-web
Aplicação Web Full Stack desenvolvida com a Stack MERN, utilizando React, Node.js, Express e MongoDB.

#Para testar o sistema:

-Abra o projeto projeto-sistema-web.

-Em um terminal, entre em backend e execute node .\src\server.js. Espere aparecer "MongoDB conectado com sucesso!" e "Servidor rodando em http://localhost:3000".

-Em outro terminal, entre em frontend e execute npm run dev.

-Acesse a tela de cadastro: http://localhost:5174/cadastro

-Faça um cadastro.

-Depois acesse: http://localhost:5174/login e faça login com o usuário cadastrado.

*Obs.: a porta do frontend pode ser diferente; nesse caso, use o endereço mostrado pelo npm run dev.

#Como acessar os Serviços
Backend: entre na pasta backend e execute:
npm start

Frontend: em outro terminal, entre na pasta frontend e execute:
npm run dev

Abra o endereço que o Vite mostrar, por exemplo:
http://localhost:5174/
Faça login no sistema.

Depois acesse:
http://localhost:5174/servicos
O que tem na tela de Serviços?

Podemos cadastrar e visualizar serviços, informando:

Nome,
Descrição e 
Preço

Os dados são enviados pelo React → Axios → API → MongoDB.
