import type { Request, Response } from "express";
import { criarUsuarioHelper } from "../../helpers/usuario/criarUsuarioHelper.js";

export async function criarUsuarioController(
  req: Request,
  res: Response,
) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: "Nome, e-mail e senha são obrigatórios",
      });
    }

    const usuario = await criarUsuarioHelper({
      nome,
      email,
      senha,
    });

    return res.status(201).json(usuario);
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "Erro ao criar usuário";

    return res.status(400).json({
      error: mensagem,
    });
  }
}