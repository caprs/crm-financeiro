import type { Request, Response } from "express";
import { excluirEstabelecimentoHelper } from "../../helpers/estabelecimento/excluirEstabelecimentoHelper.js";

export async function excluirEstabelecimentoController(req: Request, res: Response) {
    try{
        const { id } = req.params;

        if(!id || Array.isArray(id)){
            return res.status(400).json({
                error: "ID inválido para exclusão de estabelecimento",
            })
        }

        const result = await excluirEstabelecimentoHelper(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao excluir estabelecimento",
        });
    }
}