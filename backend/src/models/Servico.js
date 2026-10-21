const mongoose = require("mongoose");

const servicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    descricao: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    preco: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Servico", servicoSchema);