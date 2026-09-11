const Servico = require("../models/Servico");

async function criarServico(req, res) {
  try {
    const { nome, descricao, preco } = req.body;

    if (!nome || preco === undefined) {
      return res.status(400).json({
        mensagem: "Nome e preço são obrigatórios",
      });
    }

    const servico = await Servico.create({
      nome,
      descricao,
      preco,
    });

    return res.status(201).json(servico);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao criar serviço",
      erro: erro.message,
    });
  }
}

async function listarServicos(req, res) {
  try {
    const servicos = await Servico.find();

    return res.json(servicos);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao listar serviços",
    });
  }
}

async function buscarServico(req, res) {
  try {
    const servico = await Servico.findById(req.params.id);

    if (!servico) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado",
      });
    }

    return res.json(servico);
  } catch (erro) {
    return res.status(400).json({
      mensagem: "ID inválido",
    });
  }
}

async function atualizarServico(req, res) {
  try {
    const { nome, descricao, preco } = req.body;

    const servico = await Servico.findByIdAndUpdate(
      req.params.id,
      { nome, descricao, preco },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!servico) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado",
      });
    }

    return res.json(servico);
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro ao atualizar serviço",
      erro: erro.message,
    });
  }
}

async function excluirServico(req, res) {
  try {
    const servico = await Servico.findByIdAndDelete(
      req.params.id
    );

    if (!servico) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado",
      });
    }

    return res.json({
      mensagem: "Serviço excluído com sucesso",
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: "ID inválido",
    });
  }
}

module.exports = {
  criarServico,
  listarServicos,
  buscarServico,
  atualizarServico,
  excluirServico,
};