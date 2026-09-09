```javascript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota inicial para testar o servidor
app.get("/", (req, res) => {
  res.json({
    mensagem: "API do Sistema de Agenda de Serviços funcionando!"
  });
});

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB conectado com sucesso!");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });
```
