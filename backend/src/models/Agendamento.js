const mongoose = require("mongoose");

const agendamentoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    servico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servico",
      required: true,
    },

    data: {
      type: String,
      required: true,
    },

    horario: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["agendado", "cancelado", "concluido"],
      default: "agendado",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Agendamento", agendamentoSchema);