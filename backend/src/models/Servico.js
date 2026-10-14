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
  maxlength: 500,
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