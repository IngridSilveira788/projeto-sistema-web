const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  criarAgendamento,
  listarAgendamentos,
  buscarAgendamento,
  atualizarAgendamento,
  cancelarAgendamento,
  excluirAgendamento,
} = require("../controllers/agendamentoController");

const router = express.Router();

router.post("/", authMiddleware, criarAgendamento);

router.get("/", authMiddleware, listarAgendamentos);

router.get("/:id", authMiddleware, buscarAgendamento);

router.put("/:id", authMiddleware, atualizarAgendamento);

router.patch(
  "/:id/cancelar",
  authMiddleware,
  cancelarAgendamento
);

router.delete(
  "/:id",
  authMiddleware,
  excluirAgendamento
);

module.exports = router;