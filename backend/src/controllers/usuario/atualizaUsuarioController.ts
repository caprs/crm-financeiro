import type { Request, Response } from "express";
import { atualizaUsuarioHelper } from "../../helpers/usuario/atualizaUsuarioHelper.js";

export async function atualizaUsuarioController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }
    const { nome, email, senha, perfil } = req.body;

    const usuario = await atualizaUsuarioHelper({
      id,
      nome,
      email,
      senha,
      perfil,
    });

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "Erro ao atualizar usuário",
    });
  }
}
