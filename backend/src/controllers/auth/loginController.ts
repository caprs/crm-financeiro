import type { Request, Response } from "express";
import { loginHelper } from "../../helpers/auth/loginHelper.js";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: "E-mail e senha são obrigatórios",
      });
    }

    const resultado = await loginHelper({
      email,
      senha,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso",
      ...resultado,
    });
  } catch (error) {
    const mensagem =
      error instanceof Error
        ? error.message
        : "Erro ao realizar login";

    if (mensagem === "E-mail ou senha inválidos") {
      return res.status(401).json({
        error: mensagem,
      });
    }

    if (mensagem === "Usuário inativo") {
      return res.status(403).json({
        error: mensagem,
      });
    }

    return res.status(400).json({
      error: mensagem,
    });
  }
}