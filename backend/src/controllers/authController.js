const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        mensagem: "Nome, e-mail e senha são obrigatórios",
      });
    }

    const usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "E-mail já cadastrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: {
        id: usuario._id,
        name: usuario.name,
        email: usuario.email,
      },
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao cadastrar usuário",
      erro: erro.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensagem: "E-mail e senha são obrigatórios",
      });
    }

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos",
      });
    }

    const senhaCorreta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos",
      });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      mensagem: "Login realizado com sucesso",
      token,
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao realizar login",
      erro: erro.message,
    });
  }
}

module.exports = {
  register,
  login,
};