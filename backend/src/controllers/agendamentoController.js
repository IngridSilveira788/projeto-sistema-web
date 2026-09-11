const Agendamento = require("../models/Agendamento");
const Servico = require("../models/Servico");

async function criarAgendamento(req, res) {
  try {
    const { servico, data, horario } = req.body;

    if (!servico || !data || !horario) {
      return res.status(400).json({
        mensagem: "Serviço, data e horário são obrigatórios",
      });
    }

    const servicoExiste = await Servico.findById(servico);

    if (!servicoExiste) {
      return res.status(404).json({
        mensagem: "Serviço não encontrado",
      });
    }

    const conflito = await Agendamento.findOne({
      data,
      horario,
      status: { $ne: "cancelado" },
    });

    if (conflito) {
      return res.status(409).json({
        mensagem: "Este horário já está ocupado",
      });
    }

    const agendamento = await Agendamento.create({
      usuario: req.userId,
      servico,
      data,
      horario,
    });

    return res.status(201).json(agendamento);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao criar agendamento",
      erro: erro.message,
    });
  }
}

async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await Agendamento.find({
      usuario: req.userId,
    }).populate("servico");

    return res.json(agendamentos);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao listar agendamentos",
    });
  }
}

async function buscarAgendamento(req, res) {
  try {
    const agendamento = await Agendamento.findOne({
      _id: req.params.id,
      usuario: req.userId,
    }).populate("servico");

    if (!agendamento) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado",
      });
    }

    return res.json(agendamento);
  } catch (erro) {
    return res.status(400).json({
      mensagem: "ID inválido",
    });
  }
}

async function atualizarAgendamento(req, res) {
  try {
    const agendamento = await Agendamento.findOne({
      _id: req.params.id,
      usuario: req.userId,
    });

    if (!agendamento) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado",
      });
    }

    const novaData = req.body.data || agendamento.data;
    const novoHorario =
      req.body.horario || agendamento.horario;

    const conflito = await Agendamento.findOne({
      _id: { $ne: agendamento._id },
      data: novaData,
      horario: novoHorario,
      status: { $ne: "cancelado" },
    });

    if (conflito) {
      return res.status(409).json({
        mensagem: "Este horário já está ocupado",
      });
    }

    if (req.body.servico) {
      agendamento.servico = req.body.servico;
    }

    agendamento.data = novaData;
    agendamento.horario = novoHorario;

    await agendamento.save();

    return res.json({
      mensagem: "Agendamento atualizado com sucesso",
      agendamento,
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro ao atualizar agendamento",
      erro: erro.message,
    });
  }
}

async function cancelarAgendamento(req, res) {
  try {
    const agendamento = await Agendamento.findOne({
      _id: req.params.id,
      usuario: req.userId,
    });

    if (!agendamento) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado",
      });
    }

    agendamento.status = "cancelado";

    await agendamento.save();

    return res.json({
      mensagem: "Agendamento cancelado com sucesso",
      agendamento,
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro ao cancelar agendamento",
    });
  }
}

async function excluirAgendamento(req, res) {
  try {
    const agendamento = await Agendamento.findOneAndDelete({
      _id: req.params.id,
      usuario: req.userId,
    });

    if (!agendamento) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado",
      });
    }

    return res.json({
      mensagem: "Agendamento excluído com sucesso",
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: "ID inválido",
    });
  }
}

module.exports = {
  criarAgendamento,
  listarAgendamentos,
  buscarAgendamento,
  atualizarAgendamento,
  cancelarAgendamento,
  excluirAgendamento,
};git status