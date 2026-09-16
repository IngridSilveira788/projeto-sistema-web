const mongoose = require("mongoose");

const servicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    descricao: {
      type: String,
      default: "",
    },

    preco: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Servico", servicoSchema);