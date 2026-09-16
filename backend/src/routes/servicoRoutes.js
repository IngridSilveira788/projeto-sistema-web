const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  criarServico,
  listarServicos,
  buscarServico,
  atualizarServico,
  excluirServico,
} = require("../controllers/servicoController");

const router = express.Router();

router.post("/", authMiddleware, criarServico);

router.get("/", authMiddleware, listarServicos);

router.get("/:id", authMiddleware, buscarServico);

router.put("/:id", authMiddleware, atualizarServico);

router.delete("/:id", authMiddleware, excluirServico);

module.exports = router;