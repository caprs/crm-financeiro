import type { Request, Response } from "express";
import { atualizaEstabelecimentoHelper } from "../../helpers/estabelecimento/atualizarEstabelecimentoHelper.js";

export async function atualizarEstabelecimentoController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        error: "ID inválido para atualização de estabelecimento",
      });
    }

    const {
      cnpj,
      razaoSocial,
      nomeFantasia,
      telefone,
      email,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    } = req.body;

    const estabelecimentoAtualizado = await atualizaEstabelecimentoHelper({
      id,
      cnpj,
      razaoSocial,
      nomeFantasia,
      telefone,
      email,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    });

    return res.status(200).json(estabelecimentoAtualizado);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Erro ao atualizar estabelecimento",
    });
  }
}